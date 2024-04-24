const { GoogleGenerativeAI } = require("@google/generative-ai");

const Session = require("../models/Session");
const User = require("../models/User");
const Story = require("../models/Story");

const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = generativeAI.getGenerativeModel({
  model: "gemini-1.0-pro",
});

module.exports.startSession = async (req, res, next) => {
  const { storyId } = req.params;
  const { email } = req.user;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    Session.findOne({ user: user._id, story: storyId }).then((session) => {
      if (session) {
        const parsedText = JSON.parse(
          session.history[session.history.length - 1].parts[0].text
        );

        req.body = { userChoice: parsedText.choices[0] };
        next();

        // return res.status(200).json({ parsedText });
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
                      text: `You are a narrator for an interactive fiction story for children. You must use simple vocabulary. The story can have multiple endings like succeeding or even failing the quest. You will present the user with up to 4 choices at a time but not every response needs to have a choice. The response must be in a JSON format like this:
                  {
                    scenario: "", choices: []
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
              generationConfig: { maxOutputTokens: 200 },
            });

            console.log(story.synopsis);

            const result = await chat.sendMessage(
              `Here is the synopsis of the book: ${story.synopsis}`
            );

            const response = await result.response;

            const text = response.text();
            console.log(response);
            console.log(text);
            console.log("test");

            const parsedText = JSON.parse(text);

            console.log(parsedText);
            console.log("test2");

            const history = await chat.getHistory();
            console.log(history);

            Session.history = [...history];
            Session.save();

            return res.status(200).json(parsedText);
          });
        });
      }
    });
  });
};

module.exports.submitUserChoice = async (req, res) => {
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
          generationConfig: { maxOutputTokens: 200 },
        });

        console.log(userChoice);

        const result = await chat.sendMessage(`I pick: ${userChoice}`);

        const response = await result.response;

        const text = response.text();
        console.log(text);

        const parsedText = JSON.parse(text);

        const history = await chat.getHistory();
        console.log(history);

        session.history = [...history];
        session.save();

        return res.status(200).json(parsedText);
      }
    );
  });
};
