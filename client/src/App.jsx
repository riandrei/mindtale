
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


function App() {

  return (
    <>  
      <Router>
        <Routes>
          <Route path="/Homepage" element={<Homepage/>}/>
          <Route path="/" element={<Login/>}/>
          <Route path="/Landing" element={<Landing/>}/>
          <Route path="/Signin" element={<Signin/>}/>
          <Route path="/LoadingScreen" element={<LoadingScreen/>}/>
          <Route path="/StoryDetails" element={<StoryDetails/>}/>
          <Route path="/StoryDetails2" element={<StoryDetails2/>}/>
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/NewUserVerify" element={<NewUserVerify />} />
          <Route path="/StoryBoard" element={<StoryBoard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
