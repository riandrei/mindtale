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

import Story from "./components/Story";
import StoryNav from "./components/StoryNav";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
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
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
