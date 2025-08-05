import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import ConnectingPage from "./pages/ConnectingPage";
import FatalErrorPage from "./pages/FatalErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connectToServer" element={<ConnectingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/error" element={<FatalErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
