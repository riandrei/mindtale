
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Landing from './pages/Landing';
import Signin from './pages/Signin';
import LoadingScreen from './pages/LoadingScreen';
import StoryDetails from './pages/StoryDetails';
import Profile from './pages/UserProfile'
import Sample from './pages/Sample'
import StoryDetails2 from './pages/StoryDetails2';


function App() {

  return (
    <>  
      <Router>
        <Routes>
          <Route path="/Homepage" element={<Homepage/>}/>
          <Route path="/Sample" element={<Sample/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/" element={<Landing/>}/>
          <Route path="/Signin" element={<Signin/>}/>
          <Route path="/LoadingScreen" element={<LoadingScreen/>}/>
          <Route path="/StoryDetails" element={<StoryDetails/>}/>
          <Route path="/StoryDetails2" element={<StoryDetails2/>}/>
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
