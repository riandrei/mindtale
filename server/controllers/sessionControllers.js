const Session = require("../models/Session");

module.exports.getGameState = (req, res) => {
  Session.findOne({ gameId: `0` }).then((session) => {
    if (!session) {
      const gameId = `0`;
      const history = `history`;
      const newSession = new Session({ gameId, history });

      newSession
        .save()
        .then((result) => {
          console.log("New session created");
          res.status(200).send(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Session found");
      res.status(200).send(session);
    }
  });
};
