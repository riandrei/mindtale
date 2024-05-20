const { GoogleGenerativeAI } = require("@google/generative-ai");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const Session = require("../models/Session");
const User = require("../models/User");
const Story = require("../models/Story");

const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = generativeAI.getGenerativeModel({
  model: "gemini-1.0-pro",
});

module.exports.startSession = async function startSession(req, res) {
  const { storyId } = req.params;
  const { email } = req.user;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    Session.findOne({ user: user._id, story: storyId }).then((session) => {
      if (session && session.history.length > 0) {
        const parsedText = JSON.parse(
          session.history[session.history.length - 1].parts[0].text
        );
        const history = session.history;
        const scenarioHistory = session.scenarioHistory;

        return res
          .status(200)
          .json({ content: { history, parsedText, scenarioHistory } });
      } else {
        const newSession = new Session({
          user: user._id,
          story: storyId,
          history: [],
        });

        newSession.save().then((Session) => {
          Story.findById(storyId).then(async (story) => {
            if (!story) {
              return res.status(400).json({ error: "Story not found" });
            }

            const chat = model.startChat({
              history: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `You are a narrator for an interactive fiction story for children. You must use simple vocabulary. You will present the user with up to 4 choices at a time but not every response needs to have a choice. The response must be in a JSON format like this:
                  {
                    narrator: "", choices: ['choice', 'choice'], scenarioImagePrompt: "", end: boolean
                  }
                  `,
                    },
                  ],
                },
                {
                  role: "model",
                  parts: [{ text: "Okay, what is the story about?" }],
                },
              ],
              generationConfig: { maxOutputTokens: 2048 },
            });

            const result = await chat.sendMessage(
              `Here is the synopsis of the book: ${story.synopsis}`
            );

            const response = await result.response;

            const text = response.text();
            const trimmedText = text.trim();

            try {
              const parsedText = JSON.parse(trimmedText);

              const history = await chat.getHistory();

              getImageScene(parsedText.scenarioImagePrompt).then(() => {
                console.log("test");

                cloudinary.uploader
                  .upload("../temp/scenario.png", {
                    unique_filename: true,
                    folder: "Mindtale/scenarioImages/",
                  })
                  .then((result) => {
                    console.log(result.secure_url);
                    fs.unlinkSync("../temp/scenario.png");

                    Session.scenarioHistory.push(result.secure_url);

                    const scenarioHistory = [...session.scenarioHistory];

                    console.log("test here");

                    Session.history = [...history];
                    Session.save();

                    return res.status(200).json({
                      content: { history, parsedText, scenarioHistory },
                    });
                  });
              });
            } catch (err) {
              console.log(err);
              if (err instanceof SyntaxError) {
                console.log("Bad JSON response. Retrying...");
                return startSession(req, res); // Retry the function
              } else {
                // Handle other errors as you see fit
              }
            }
          });
        });
      }
    });
  });
};

module.exports.submitUserChoice = async function submitUserChoice(req, res) {
  const { storyId } = req.params;
  const { email } = req.user;
  const { userChoice } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    Session.findOne({ user: user._id, story: storyId }).then(
      async (session) => {
        if (!session) {
          return res.status(400).json({ error: "Session not found" });
        }

        const chat = model.startChat({
          history: session.history.map(({ _id, role, parts }) => {
            const cleanedParts = parts.map(({ text }) => ({ text }));
            return { role, parts: cleanedParts };
          }),
          generationConfig: { maxOutputTokens: 2048 },
        });

        const result = await chat.sendMessage(`I pick: ${userChoice}`);

        const response = await result.response;

        const text = response.text();
        const trimmedText = text.trim();

        try {
          const parsedText = JSON.parse(trimmedText);

          const history = await chat.getHistory();

          session.history = [...history];
          session.save();

          const scenarioHistory = [];

          return res.status(200).json({ history, parsedText, scenarioHistory });

          // getImageScene(parsedText.scenarioImagePrompt).then(() => {
          //   console.log("test");

          //   cloudinary.uploader
          //     .upload("../temp/scenario.png", {
          //       unique_filename: true,
          //       folder: "Mindtale/scenarioImages/",
          //     })
          //     .then((result) => {
          //       fs.unlinkSync("../temp/scenario.png");

          //       Session.scenarioHistory.push(result.secure_url);

          //       const scenarioHistory = [...session.scenarioHistory];

          //       console.log("test here");

          //       Session.history = [...history];
          //       Session.save();

          //       return res
          //         .status(200)
          //         .json({ history, parsedText, scenarioHistory });
          //     });
          // });
        } catch (err) {
          console.log(err);
          if (err instanceof SyntaxError) {
            console.log("Bad JSON response. Retrying...");
            return submitUserChoice(req, res); // Retry the function
          } else {
            // Handle other errors as you see fit
          }
        }
      }
    );
  });
};

module.exports.getAssesment = (req, res) => {
  const { storyId } = req.params;
  const { email } = req.user;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    Session.findOne({ user: user._id, story: storyId }).then((session) => {
      const storyFlow = session.history
        .map(({ parts, role }, index) => {
          if (index < 3) {
            return null;
          }

          if (role == "user") {
            return parts[0].text;
          } else {
            const { scenario } = JSON.parse(parts[0].text);

            return `narrator: ${scenario}`;
          }
        })
        .filter((text) => text !== null)
        .join("\n");

      fetch(`https://mindtale.southeastasia.inference.ml.azure.com/score`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.AZURE_SUMMARIZER_API_KEY,
          "azureml-model-deployment": "facebook-bart-large-cnn-19",
        },
        body: JSON.stringify({ inputs: storyFlow }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            // Print the headers - they include the request ID and the timestamp, which are useful for debugging the failure
            console.debug(...response.headers);
            console.debug(response.body);
            throw new Error(
              "Request failed with status code" + response.status
            );
          }
        })
        .then((json) => console.log(json))
        .catch((error) => {
          console.error(error);
        });
    });
  });
};

function getImageScene(scenarioImagePrompt) {
  return new Promise((resolve, reject) => {
    console.log(scenarioImagePrompt + ", colorful" + ", child friendly");

    fetch(`https://api.getimg.ai/v1/stable-diffusion-xl/text-to-image`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.GETIMG_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: scenarioImagePrompt + ", colorful" + ", child friendly",
        width: 512,
        height: 512,
        steps: 10,
      }),
    })
      .then(async (response) => {
        response.json().then((res) => {
          const buffer = Buffer.from(res.image, "base64");
          console.log(res.im);
          fs.writeFile("../temp/scenario.png", buffer, (err) => {
            if (err) throw err;
            console.log("Saved!");
            resolve();
          });
        });
      })
      .catch((error) => reject(error));
  });
}
