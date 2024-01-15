
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Landing from './pages/Landing';
import Signin from './pages/Signin';

function App() {

  return (
    <>  
      <Router>
        <Routes>
          <Route path="/Homepage" element={<Homepage/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/" element={<Landing/>}/>
          <Route path="/Signin" element={<Signin/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
