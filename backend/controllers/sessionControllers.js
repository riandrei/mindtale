const { GoogleGenerativeAI } = require("@google/generative-ai");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const util = require("util");
const { Translate } = require("@google-cloud/translate").v2;
// const textToSpeech = require("@google-cloud/text-to-speech");

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

    Session.find({ user: user._id, story: storyId }).then((sessions) => {
      const session = sessions[sessions.length - 1];
      if (session && session.history.length > 0) {
        const parsedText = JSON.parse(
          session.history[session.history.length - 1].parts[0].text
        );
        const history = session.history;
        const scenarioHistory = session.scenarioHistory;
        const assesment = session.assesment;

        return res.status(200).json({
          content: { history, parsedText, scenarioHistory, assesment },
        });
      } else {
        const newSession = new Session({
          user: user._id,
          story: storyId,
          history: [],
          scenarioHistory: [],
          assesment: {},
        });

        newSession.save().then((Session) => {
          Story.findById(storyId).then(async (story) => {
            if (!story) {
              return res.status(400).json({ error: "Story not found" });
            }

            Session.scenarioHistory = [`${story.imgURL}`];

            const chat = model.startChat({
              history: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `You will be given a story title and synopsis. Your reply should include a 50 word long narration, multiple actions the user can pick from, and a boolean value indicating if the story has ended. Keep in mind that the story should be straightforward and short. Do not repeat the same narrations or actions you have already said previously. Change isEnd to true once it has been about 15 chats back and forth.

            Example story title and synopsis: "Dragon's Quest: Welcome to the realm of Avalon, a land shrouded in whispers of forgotten magic and mythical creatures. You are no longer a nameless villager, but a budding hero thrust into an extraordinary adventure. A shadow has fallen upon Avalon. Whispers of a slumbering dragon, awakened by a malevolent force, spread fear throughout the kingdom.",
            Example response:
            {
              "narrator": "The sun, a lazy orange eye peeking over snow-capped mountains, bathes the quaint village of Elmsbrook in a gentle glow. You stretch your arms, the crisp morning air a welcome contrast to the warmth of your straw mattress. But today feels different. A strange tension hangs heavy in the air, whispers of a long-dormant threat slithering through the usually cheerful greetings. The village elder, her once vibrant face etched with worry, calls you to the center square. There, under the gnarled oak, she reveals the chilling truth: the dragon of Mount Dracoheim, a beast of legend whispered only in hushed tones, has awakened. Its fiery breath threatens to engulf the kingdom in chaos. You, a budding adventurer with a thirst for knowledge and a heart full of courage, feel a spark ignite within you. Maybe the whispers are true – maybe you were destined for something more than tending sheep. Today, your life takes a sharp turn. Today, your quest begins."
              "actions": [{"text": text here", "imagePrompt": "prompt here"}, {"text": "text here", "imagePrompt": "prompt here"}, {"text": "text here", "imagePrompt": "prompt here"}, {"text": "text here", "imagePrompt": "prompt here"}]
              "isEnd": false
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
              generationConfig: { maxOutputTokens: 500 },
            });

            const result = await chat.sendMessage(
              `The story is titled: ${story.title}. The synopsis is as follows: ${story.synopsis}`
            );

            const response = await result.response;

            const text = response.text();
            const trimmedText = text.trim();

            try {
              const parsedText = JSON.parse(trimmedText);

              const history = await chat.getHistory();

              parsedText.actions.forEach((action) => {
                getImageScene(
                  action.imagePrompt,
                  action.text.slice(0, action.text.indexOf(":"))
                );
              });

              Session.history = [...history];
              Session.save();

              const scenarioHistory = [...Session.scenarioHistory];
              const assesment = Session.assesment;

              saveWords(parsedText.narrator, email);

              return res.status(200).json({
                content: { history, parsedText, scenarioHistory, assesment },
              });
            } catch (err) {
              console.log(err);
              if (err instanceof SyntaxError) {
                console.log("Bad JSON response. Retrying...");
                return startSession(req, res); // Retry the function
              } else {
                // Handle other errors
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

        session.scenarioHistory.push(
          `https://res.cloudinary.com/drcynbces/image/upload/Mindtale/temp/${userChoice.text
            .slice(0, userChoice.text.indexOf(":"))
            .replace(/\s/g, "")
            .replace(/'/g, "")}.jpg`
        );

        const chat = model.startChat({
          history: session.history.map(({ _id, role, parts }) => {
            const cleanedParts = parts.map(({ text }) => ({ text }));
            return { role, parts: cleanedParts };
          }),
          generationConfig: { maxOutputTokens: 5000 },
        });

        const result = await chat.sendMessage(
          `I pick: ${userChoice.text}.
          
          Example response in JSON format:
          {
            "narrator": "The sun, a lazy orange eye peeking over snow-capped mountains, bathes the quaint village of Elmsbrook in a gentle glow. You, (your name), stretch your arms, the crisp morning air a welcome contrast to the warmth of your straw mattress. But today feels different. A strange tension hangs heavy in the air, whispers of a long-dormant threat slithering through the usually cheerful greetings. The village elder, her once vibrant face etched with worry, calls you to the center square. There, under the gnarled oak, she reveals the chilling truth: the dragon of Mount Dracoheim, a beast of legend whispered only in hushed tones, has awakened. Its fiery breath threatens to engulf the kingdom in chaos. You, a budding adventurer with a thirst for knowledge and a heart full of courage, feel a spark ignite within you. Maybe the whispers are true – maybe you were destined for something more than tending sheep. Today, your life takes a sharp turn. Today, your quest begins."
            "actions": [{"text": "Embrace the Hero's Call: Step forward, declare your willingness to face the dragon, and ask the Elder for guidance on preparing for the perilous journey.", "imagePrompt": "Talking to Elder"}, {"text": "Seek Hidden Knowledge: Express your concern about the dragon's sudden awakening and inquire about the cause. Perhaps the Elder knows of ancient texts or hidden lore that could shed light on the situation.", "imagePrompt": "Talking to the worried village Elder"}, {"text": "Explore Your Options: Before committing to such a daunting task, you could express your hesitance and ask the Elder for more information about the dragon and the potential dangers involved. Perhaps there's another way to resolve the situation.", "imagePrompt": "Talking to the worried village Elder"}]
            "isEnd": false
          }
          `
        );

        const response = await result.response;

        const text = response.text();
        const trimmedText = text.trim();

        try {
          const parsedText = JSON.parse(trimmedText);

          const history = await chat.getHistory();

          parsedText.actions.forEach((action) => {
            getImageScene(
              action.imagePrompt,
              action.text.slice(0, action.text.indexOf(":"))
            );
          });

          session.history = [...history];
          session.save();

          const scenarioHistory = [...session.scenarioHistory];
          const assesment = session.assesment;

          saveWords(parsedText.narrator, email);

          return res
            .status(200)
            .json({ history, parsedText, scenarioHistory, assesment });
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
          generationConfig: { maxOutputTokens: 5000 },
        });

        const result = await chat.sendMessage(
          `Based on our previous conversations, can you provide 10 multiple choice questions that can be used to assess the user's understanding of the story in JSON format.
          
          Example Response: 
          {
            "questions": [
              {
                "question": "What was the main conflict faced by the protagonist?",
                "answers": [
                  "Answer A",
                  "Answer B",
                  "Answer C",
                  "Answer D"
                ]
              },
              {
                "question": "Where did the climax of the story take place?",
                "answers": [
                  "Location A",
                  "Location B",
                  "Location C",
                  "Location D"
                ]
              },
              {
                "question": "What was the significance of [object/event] in the story?",
                "answers": [
                  "Explanation A",
                  "Explanation B",
                  "Explanation C",
                  "Explanation D"
                ]
              },
            ],
          "correctAnswers": ["B", "C", "C"]
          }
          `
        );

        const response = await result.response;

        const text = response.text();
        const trimmedText = text.trim();

        try {
          const parsedText = JSON.parse(trimmedText);

          session.assesment = parsedText;

          session.save();

          return res.status(200).json({ assesment: parsedText });
        } catch (err) {
          console.log(err);
        }
      }
    );
  });
};

module.exports.submitAssesmentScore = (req, res) => {
  const { storyId } = req.params;
  const { email } = req.user;
  const { assesmentScore } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    Session.findOne({ user: user._id, story: storyId }).then((session) => {
      session.assesment.assesmentScore = assesmentScore;

      session.save();

      return res.status(200);
    });
  });
};

function getImageScene(imagePrompt, userAction) {
  fetch(`https://api.getimg.ai/v1/latent-consistency/text-to-image`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.GETIMG_API_KEY}`,
    },
    body: JSON.stringify({
      model: "lcm-realistic-vision-v5-1",
      prompt: `${imagePrompt}, Fantasy, Colorful`,
      width: 512,
      height: 512,
      steps: 8,
    }),
  })
    .then((response) => {
      response.json().then((res) => {
        const buffer = Buffer.from(res.image, "base64");

        return cloudinary.uploader.upload(
          `data:image/png;base64,${buffer.toString("base64")}`,
          {
            public_id: userAction.replace(/\s/g, "").replace(/'/g, ""),
            folder: "Mindtale/temp/",
          }
        );
      });
    })
    .catch((error) => console.error(error));
}

module.exports.translateText = (req, res) => {
  const { text, targetLanguage } = req.body;

  const translate = new Translate({
    projectId: "mindtale",
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });

  translate
    .translate(text, targetLanguage)
    .then((results) => {
      const translation = results[0];

      return res.status(200).json({ translation });
    })
    .catch((error) => console.error(error));
};

function saveWords(narration, email) {
  const wordsArray = narration
    .toLowerCase()
    .replace(/[^a-z\s']/g, "") // Remove punctuation except apostrophes
    .split(/\s+/); // Split by whitespace

  // Step 2: Count unique words
  const wordMap = {};
  wordsArray.forEach((word) => {
    if (word) {
      if (!wordMap[word]) {
        wordMap[word] = { timesEncountered: 0, interactions: 0 };
      }
      wordMap[word].timesEncountered++;
    }
  });

  // Step 3: Convert to the desired format
  const newWords = Object.entries(wordMap).map(([word, data]) => ({
    word,
    timesEncountered: data.timesEncountered.toString(),
    interactions: data.interactions.toString(),
  }));

  User.findOne({ email }).then((user) => {
    if (!user) {
      console.error(`User with email ${email} not found.`);
      return;
    }

    const existingWords = user.words || [];

    // Merge new words with existing saved words
    const mergedWords = [...existingWords];

    newWords.forEach((newWord) => {
      const existingWord = mergedWords.find(
        (word) => word.word === newWord.word
      );
      if (existingWord) {
        existingWord.timesEncountered = (
          parseInt(existingWord.timesEncountered, 10) +
          parseInt(newWord.timesEncountered, 10)
        ).toString();
        existingWord.interactions = existingWord.interactions; // No change here
      } else {
        mergedWords.push(newWord);
      }
    });

    user.words = mergedWords;

    // Save the updated user data
    user.save().catch((err) => {
      console.error("Error saving user data:", err);
    });
  });
}
