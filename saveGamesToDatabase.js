const Story = require("./server/models/Story");

const games = [
  {
    title: "The Last of Us",
    synopsis: "Joel, a brutal survivor, and Ellie",
    tags: ["action", "adventure"],
    imgURL: "https://www.google.com",
  },
  {
    title: "Uncharted 4: A Thief's End",
    synopsis: "Nathan Drake, a retired treasure hunter",
    tags: ["action", "adventure"],
    imgURL: "https://www.google.com",
  },
  {
    title: "God of War",
    synopsis: "Kratos, the former Greek God of War",
    tags: ["action", "adventure"],
    imgURL: "https://www.google.com",
  },
  {
    title: "Horizon Zero Dawn",
    synopsis: "Aloy, a young hunter",
    tags: ["action", "adventure"],
    imgURL: "https://www.google.com",
  },
  {
    title: "Bloodborne",
    synopsis: "A hunter, who is customizable",
    tags: ["action", "adventure"],
    imgURL: "https://www.google.com",
  },
  {
    title: "Ratchet & Clank",
    synopsis: "Ratchet, a Lombax mechanic",
    tags: ["action", "adventure"],
    imgURL: "https://www.google.com",
  },
  {
    title: "Marvel's Spiderman",
    synopsis: "Peter Parker, a young man",
    tags: ["action", "adventure"],
    imgURL: "https://www.google.com",
  },
];

function saveGamesToDatabase() {
  games.forEach((game) => {
    const newGame = new Story(game);
    newGame
      .save()
      .then(() => {
        console.log("Game saved");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

module.exports = saveGamesToDatabase;
