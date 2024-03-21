import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./interface/styles/theme/theme";
import LogInPage from "./pages/LogInPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/login" element={<LogInPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
