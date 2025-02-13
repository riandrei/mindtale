import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import LoadingScreen from "./pages/LoadingScreen";
import StoryDetails from "./pages/StoryDetails";
import Profile from "./pages/UserProfile";
import StoryDetails2 from "./pages/StoryDetails2";
import Settings from "./pages/Settings";
import NewUserVerify from "./pages/NewUserVerify";
import StoryBoard from "./pages/StoryBoard";
import SearchPeople from "./pages/SearchPeople";
import SearchBook from "./pages/SearchBook";
import Admin from "./pages/Admin";
import MetricsPage from "./pages/MetricsPage";
import Quiz from "./pages/Quiz";
import ViewAll from "./pages/ViewAll";
import Leaderboard from "./pages/Leaderboard";
import TermsAndConditions from "./pages/TermsAndConditions";
import StudentDetails from "./pages/StudentDetails";
import SchoolAdmin from "./pages/SchoolAdmin";
import AboutUs from "./components/AboutUs";
import Dictionary from "./pages/Dictionary";

import Story from "./components/Story";
import StoryNav from "./components/StoryNav";
import StoryPreference from "./pages/StoryPreference";
import WordsMastered from "./pages/WordsMastered";
import PreTest from "./pages/PreTest";
import PostTest from "./pages/PostTest";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/LoadingScreen" element={<LoadingScreen />} />
          <Route path="/StoryDetails/:storyId" element={<StoryDetails />} />
          <Route path="/StoryDetails2" element={<StoryDetails2 />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/NewUserVerify" element={<NewUserVerify />} />
          <Route path="/StoryBoard/:storyId" element={<StoryBoard />} />
          <Route path="/SearchPeople" element={<SearchPeople />} />
          <Route path="SearchBook" element={<SearchBook />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/MetricsPage" element={<MetricsPage />} />
          <Route path="/ViewAll" element={<ViewAll />} />
          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route
            path="/Quiz"
            element={
              <Quiz
              // questionCount={questionCount}
              // handleQuestionCount={handleQuestionCount}
              // isLight={isLight}
              // handleThemeClick={handleThemeClick}
              />
            }
          />
          <Route
            path="/Settings"
            element={
              <Settings
              // settingClick={settingClick}
              // handleSettingClick={handleSettingClick}
              />
            }
          />
          <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
          <Route path="/UserDetails" element={<StudentDetails />} />
          <Route path="/StoryPreference" element={<StoryPreference />} />
          <Route path="/SchoolAdmin" element={<SchoolAdmin />} />
          <Route path="/Dictionary" element={<Dictionary />} />
          <Route path="/WordsMastered" element={<WordsMastered />} />
          <Route path="/PreTest" element={<PreTest />} />
          <Route path="/PostTest" element={<PostTest />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
