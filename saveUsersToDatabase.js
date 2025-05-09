const User = require("./backend/models/User");

const users = [
  {
    username: "patricia",
    email: "patricia.manalo@yahoo.com",
    password: "Mu3xVt6qXr",
    verified: false,
    verificationCode: "V8TNM5YAZK",
    age: "13",
    gradeLevel: "7",
    sex: "Female",
    school: "Tapinac Elementary School",
    storyPreference: ["Adventure", "Historical"],
    completedStories: [
      { story: "664162ba0b60ea33bcff0764", assesmentScore: "7" },
      { story: "66e48109d6933866dff2d52a", assesmentScore: "8" },
    ],
  },
  {
    username: "miguel",
    email: "miguel.delacruz@gmail.com",
    password: "Rw8Lp1zNv",
    verified: false,
    verificationCode: "J4KZ93YTXU",
    age: "12",
    gradeLevel: "6",
    sex: "Male",
    school: "Tapinac Elementary School",
    storyPreference: ["Fantasy", "Mythology"],
    completedStories: [
      { story: "664162ba0b60ea33bcff0762", assesmentScore: "9" },
      { story: "6641b44d948c65cab1ba0f65", assesmentScore: "6" },
    ],
  },
  {
    username: "alyssa",
    email: "alyssa.reyes@hotmail.com",
    password: "Xp7Vr2eBt",
    verified: false,
    verificationCode: "F7PQL9X2EM",
    age: "13",
    gradeLevel: "7",
    sex: "Female",
    school: "Tapinac Elementary School",
    storyPreference: ["Romance", "Adventure"],
    completedStories: [
      { story: "6641b44d948c65cab1ba0f67", assesmentScore: "10" },
    ],
  },
  {
    username: "johnmark",
    email: "john.mark09@gmail.com",
    password: "Ht3Kq7LpYz",
    verified: false,
    verificationCode: "LX92PTKABW",
    age: "14",
    gradeLevel: "8",
    sex: "Male",
    school: "Tapinac Elementary School",
    storyPreference: ["Historical", "Science Fiction"],
    completedStories: [
      { story: "6641bd9f8855018d85e5ef59", assesmentScore: "8" },
      { story: "66e48109d6933866dff2d52a", assesmentScore: "7" },
    ],
  },
  {
    username: "jenny",
    email: "jenny.bacani@gmail.com",
    password: "Bz5Np2VmRa",
    verified: false,
    verificationCode: "W3TZKLMN2Y",
    age: "12",
    gradeLevel: "6",
    sex: "Female",
    school: "Tapinac Elementary School",
    storyPreference: ["Adventure", "Fantasy"],
    completedStories: [
      { story: "664162ba0b60ea33bcff0764", assesmentScore: "6" },
      { story: "6641b44d948c65cab1ba0f67", assesmentScore: "7" },
    ],
  },
  {
    username: "carl",
    email: "carl.lopez@yahoo.com",
    password: "Uy9Rw5NkZt",
    verified: false,
    verificationCode: "RTPX9WLM35",
    age: "11",
    gradeLevel: "5",
    sex: "Male",
    school: "Tapinac Elementary School",
    storyPreference: ["Science Fiction", "Mystery"],
    completedStories: [
      { story: "6641b44d948c65cab1ba0f65", assesmentScore: "5" },
      { story: "66e48109d6933866dff2d52a", assesmentScore: "9" },
    ],
  },
  {
    username: "angelica",
    email: "angelica.santos@gmail.com",
    password: "Lf2Yp6ZuRt",
    verified: false,
    verificationCode: "ZP92XKMLR7",
    age: "13",
    gradeLevel: "7",
    sex: "Female",
    school: "Tapinac Elementary School",
    storyPreference: ["Romance", "Mythology"],
    completedStories: [
      { story: "6641bd9f8855018d85e5ef59", assesmentScore: "8" },
      { story: "664162ba0b60ea33bcff0762", assesmentScore: "6" },
    ],
  },
  {
    username: "ronald",
    email: "ronald.torres@yahoo.com",
    password: "Tp6Zm4BxVs",
    verified: false,
    verificationCode: "YX73CPLM92",
    age: "14",
    gradeLevel: "8",
    sex: "Male",
    school: "Tapinac Elementary School",
    storyPreference: ["Adventure", "Science Fiction"],
    completedStories: [
      { story: "6641b44d948c65cab1ba0f67", assesmentScore: "9" },
    ],
  },
  {
    username: "clarisse",
    email: "clarisse.mendoza@gmail.com",
    password: "Xq9Fp1LsTn",
    verified: false,
    verificationCode: "CXP92LMNZ4",
    age: "12",
    gradeLevel: "6",
    sex: "Female",
    school: "Tapinac Elementary School",
    storyPreference: ["Historical", "Romance"],
    completedStories: [
      { story: "66e48109d6933866dff2d52a", assesmentScore: "10" },
      { story: "6641bd9f8855018d85e5ef59", assesmentScore: "7" },
    ],
  },
  {
    username: "leonard",
    email: "leonard.diaz@hotmail.com",
    password: "Dr7Wn8KyUx",
    verified: false,
    verificationCode: "PTXN9LMRV4",
    age: "13",
    gradeLevel: "7",
    sex: "Male",
    school: "Tapinac Elementary School",
    storyPreference: ["Fantasy", "Adventure"],
    completedStories: [
      { story: "6641b44d948c65cab1ba0f65", assesmentScore: "6" },
      { story: "6641bd9f8855018d85e5ef59", assesmentScore: "9" },
    ],
  },
];

function saveUsersToDatabase() {
  users.forEach((user) => {
    const newUser = new User(user);
    newUser
      .save()
      .then(() => {
        console.log("Story saved");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

module.exports = saveUsersToDatabase;
