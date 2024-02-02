import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import LoadingScreen from "./pages/LoadingScreen";
import { StoryDetails } from "./pages/StoryDetails";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Landing" element={<Landing />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/LoadingScreen" element={<LoadingScreen />} />
          <Route path="/StoryDetails" element={<StoryDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
