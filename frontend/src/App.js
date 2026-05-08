
import Welcome from './Welcome.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register.js";
import Login from "./Login.js";
import Numbertobinary from "./Numbertobinary.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={< Login/>} />
        <Route path="/numbertobinary" element={< Numbertobinary/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
