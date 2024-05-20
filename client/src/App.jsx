import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Landing from './pages/Landing';
import Signin from './pages/Signin';
import LoadingScreen from './pages/LoadingScreen';
import StoryDetails from './pages/StoryDetails';
import Profile from './pages/UserProfile'
import StoryDetails2 from './pages/StoryDetails2';
import Settings from './pages/Settings';
import NewUserVerify from './pages/NewUserVerify';
import { StoryBoard } from './pages/StoryBoard';
import { SearchPeople } from './pages/SearchPeople';
import SearchBook from './pages/SearchBook';
import Admin from './pages/Admin'
import MetricsPage from './pages/MetricsPage'
import Quiz from './pages/Quiz';

import Story from './components/Story'
import StoryNav from './components/StoryNav'



function App() {

  // For storyboard open and close navbar
  const [openNav, setOpenNav] = useState(false);
  const handleNavClick = () => {
    console.log("Hello check")
    setOpenNav(!openNav);
  }

  // For toggle in settings
  const [settingClick , setSettingClick] = useState(1);
  const handleSettingClick = (value) => {
    setSettingClick(value)
    console.log(value)
  }

  const [questionCount, setQuestionCount] = useState(1);
  const handleQuestionCount = () => {
      setQuestionCount(prevCount => {
          if (prevCount >= 10) {
              return 1; 
          }
          return prevCount + 1; 
      });
  };

  const [isLight, setIsLight] = useState(false)
  const handleThemeClick = () => {
    setIsLight( !isLight)
    console.log("light")
  }

  return (
    <> 
      <Router>
        <Routes>
          <Route path="/Homepage" element={<Homepage/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/" element={<Landing/>}/>
          <Route path="/Signin" element={<Signin/>}/>
          <Route path="/LoadingScreen" element={<LoadingScreen/>}/>
          <Route path="/StoryDetails" element={<StoryDetails/>}/>
          <Route path="/StoryDetails2" element={<StoryDetails2/>}/>
          <Route path="/Profile" element={<Profile />} />
          <Route path="/NewUserVerify" element={<NewUserVerify />} />
          <Route path="/SearchPeople" element={<SearchPeople />} />
          <Route path="SearchBook" element={<SearchBook />}/>
          <Route path="/Admin" element={<Admin/>}/>
          <Route path="/MetricsPage" element={<MetricsPage/>}/>

          <Route 
            path="/Quiz" 
            element={<Quiz questionCount={questionCount} handleQuestionCount={handleQuestionCount} isLight={isLight} handleThemeClick={handleThemeClick} />}
            
          />

          <Route
            path="/StoryBoard"
            element={<StoryBoard openNav={openNav} handleNavClick={handleNavClick} isLight={isLight} handleThemeClick={handleThemeClick}/>}
          />

          <Route 
            path="/Settings" 
            element={<Settings settingClick={ settingClick } handleSettingClick={ handleSettingClick }/>} />

        </Routes>
      </Router>
    </>
  )
}

export default App
