const Story = require("./server/models/Story");

const stories = [
  {
    title: "Shipwrecked on Siren Isle",
    tags: ["Adventure", "Exploration", "Puzzle", "Mystery"],
    synopsis:
      "You find yourself washed ashore on a lush, uncharted island after a ferocious storm. With no memory of the events leading to your shipwreck, you must explore the island's secrets to find a way to signal for help. However, the island holds more than just beautiful scenery - whispers of sirens and cryptic messages carved into ancient ruins suggest a deeper mystery. Will you unravel the island's secrets, or succumb to its siren song?",
    imgURL:
      "https://res.cloudinary.com/drcynbces/image/upload/v1714365757/Mindtale/stories/shipwrecked-on-siren-isle-_ygztnn.jpg",
  },
  {
    title: "Echoes of the Clockwork City",
    tags: ["Steampunk", "Mystery", "Inventory", "Choices"],
    synopsis:
      "You are a tinker in a bustling clockwork metropolis powered by steam and invention. One foggy morning, you stumble upon a hidden workshop filled with peculiar contraptions. A cryptic message left behind by the workshop's missing owner leads you on a chase through the city's metallic underbelly. With the help of your trusty tools and wits, you must decipher the message, navigate the perilous underbelly, and uncover the secrets of the missing inventor before a shadowy organization gets their hands on his work.",
    imgURL:
      "https://res.cloudinary.com/drcynbces/image/upload/v1714365764/Mindtale/stories/echoes-of-clockwork-city_ozagiw.jpg",
  },
  {
    title: "The Whisper of Parchment",
    tags: ["Fantasy", "Intrigue", "Choices", "Dialogue"],
    synopsis:
      "You are a lowly scribe in the bustling Royal Library, surrounded by ancient knowledge but yearning for adventure. One day, while dusting a forgotten corner, you unearth a hidden chamber containing a single, glowing scroll. The scroll whispers secrets in a forgotten tongue, hinting at a hidden rebellion brewing within the kingdom. Torn between loyalty and a thirst for justice, you must decipher the scroll's message and decide your role in the coming conflict.",
    imgURL:
      "https://res.cloudinary.com/drcynbces/image/upload/v1714365761/Mindtale/stories/the-whisper-of-parchment_genr9f.jpg",
  },
  {
    title: "Neon Noir Nightmares",
    tags: ["Cyberpunk", "Investigation", "Choices", "Combat"],
    synopsis:
      "Los Angeles, 2077. You're a down-on-your-luck private eye in a city choked by neon and corruption. A cryptic message from a mysterious client leads you to a high-stakes case involving memory manipulation technology and a missing heiress. As you delve deeper into the neon-drenched underbelly, you'll encounter shady characters, augmented thugs, and a truth that could shatter the city's fragile peace. Can you navigate the treacherous world of mind-bending tech and uncover the truth before it's too late?",
    imgURL:
      "https://res.cloudinary.com/drcynbces/image/upload/v1714365756/Mindtale/stories/neon-noir-nightmares_kmfnes.jpg",
  },
  {
    title: "Galactic Gourmet Getaway",
    tags: ["Sci-Fi", "Humor", "Exploration", "Choices"],
    synopsis:
      "You're a jaded intergalactic food critic on a forced vacation. Your editor, a tyrannical lizard-like creature named Zxalg, has banished you to a remote, uncharted planet rumored to hold the galaxy's most exquisite culinary delights. Armed with your trusty spork (it folds!) and a healthy dose of sarcasm, you must explore the planet, encounter its bizarre inhabitants, and sample their unique, and possibly questionable, delicacies. Will you conquer your vacation blues, discover the ultimate culinary masterpiece, or end up with food poisoning on a backwater planet?",
    imgURL:
      "https://res.cloudinary.com/drcynbces/image/upload/v1714365754/Mindtale/stories/galactic-gourmet-getaway_aug5vp.jpg",
  },
];

function saveGamesToDatabase() {
  stories.forEach((story) => {
    const newStory = new Story(story);
    newStory
      .save()
      .then(() => {
        console.log("Story saved");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

module.exports = saveGamesToDatabase;
