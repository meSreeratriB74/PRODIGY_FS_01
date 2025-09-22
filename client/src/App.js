import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Welcome from "./Welcome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
