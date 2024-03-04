import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./interface/components/SignUp/SignUp";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mainpage" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
