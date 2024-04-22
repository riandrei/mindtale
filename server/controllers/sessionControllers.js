const { GoogleGenerativeAI } = require("@google/generative-ai");

const Session = require("../models/Session");
const User = require("../models/User");
const Story = require("../models/Story");

const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports.startSession = async (req, res) => {
  const { storyId } = req.params;
  const { email } = req.user;

  console.log(storyId, email);

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    Session.findOne({ user: user._id, story: storyId }).then((session) => {
      if (session) {
        return res.status(200).json({ session });
      } else {
        const newSession = new Session({
          user: user._id,
          story: storyId,
          history: [],
        });

        newSession.save().then((session) => {
          Story.findById(storyId).then(async (story) => {
            if (!story) {
              return res.status(400).json({ error: "Story not found" });
            }

            const model = generativeAI.getGenerativeModel({
              model: "gemini-1.0-pro",
            });

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

            let result = await chat.sendMessage(
              `Here is the synopsis of the book: ${story.synopsis}`
            );

            const response = await result.response;

            const text = response.text();
            console.log(response);
            console.log(text);
            const history = await chat.getHistory();
            console.log(history);
            console.log("test");

            return res.status(200);

            // const history = chat.history();

            // session.history.push({
            //   role: "model",
            //   parts: [
            //     {
            //       text: `scenario: ${text.scenario} choices: ${text.choices}`,
            //     },
            //   ],
            // });
          });
        });
      }
    });
  });

  // const model = generativeAI.getGenerativeModel({ model: "gemini-1.0-pro" });

  // const chat = model.startChat({
  //   history: [
  //     {
  //       role: "user",
  //       parts: [{ text: "Hello, I am Riandrei." }],
  //     },
  //     {
  //       role: "model",
  //       parts: [{ text: "Great to meet you. What would you like to know?" }],
  //     },
  //   ],

  //   generationConfig: { maxOutputTokens: 100 },
  // });

  // const result = await chat.sendMessage("Hello! I am riandrei");

  // const response = await result.response;

  // const text = response.text();

  // console.log(text);

  // const result2 = await chat.sendMessage("What's my name?");

  // const response2 = await result2.response;

  // const text2 = response2.text();

  // console.log(text2);
};
