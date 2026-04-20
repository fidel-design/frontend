import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Events from "./components/Events";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />.
         <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;