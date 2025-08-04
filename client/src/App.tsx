import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import ConnectingPage from "./pages/ConnectingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connectToServer" element={<ConnectingPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
