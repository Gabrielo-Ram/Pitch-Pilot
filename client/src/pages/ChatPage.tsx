import { useEffect, useState } from "react";
import DisplayMessages from "../features/ChatWindow/DisplayMessages";
import SubmitMessage from "../features/ChatWindow/SubmitMessage";
import Navbar from "../components/Navbar";
import type { Message } from "../types";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
if (!BACKEND_URL) {
  throw new Error("❌ Could not load backend URL from environment");
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [fatalError, setfatalError] = useState<boolean>(false);
  //const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const navigate = useNavigate();

  //Content that guides the user on how to use this page.
  const toolTipText = `Talk to Gemini about your pitch deck through this chat window! Simply type your query and hit 'Enter' to submit it to Gemini. 
  You can ask Gemini to help you with any of the following:
  - · **Review your deck**
  - · **Create a short-form 2-minute version of your deck**
  - · **Create a one-pager for each company in your presentation batch (if you uploaded a compilation of multiple startup decks)**`;

  //Navigate to 'Error' page if we ever encounter a fatal error
  useEffect(() => {
    if (fatalError) navigate("/error");
  }, [fatalError]);

  //Send system prompt to Gemini upon first render
  useEffect(() => {
    const sendSystemPrompt = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/mcp/sendContext`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) setfatalError(true);

        const data = await res.json();

        //Renders Gemini's response in the frontend
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "model",
            reply: data.message,
          },
        ]);
      } catch (error) {
        console.error(`❌ Failed to send system prompt to MCP: \n${error}`);
        setfatalError(true);
      }
    };

    sendSystemPrompt();
  }, []);

  //Scan for a new file, once found, automatically download it.
  useEffect(() => {
    const scanForNewFile = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        //Check if the file exists
        const res = await fetch(
          `${BACKEND_URL}/downloads/PitchPilotDeck.pptx`,
          {
            method: "HEAD",
          }
        );

        if (res.ok) {
          const a = document.createElement("a");
          a.href = `${BACKEND_URL}/downloads/PitchPilotDeck.pptx`;
          a.download = "PitchPilotDeck.pptx";
          a.click();
        }
      } catch (error) {
        console.error("Error checking for .pptx file: \n", error);
      }
    };

    scanForNewFile();
  });

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col place-items-center bg-gray-800 text-xl">
      <Navbar showToolTip={true} toolTipText={toolTipText} />
      <DisplayMessages messages={messages} />
      <SubmitMessage setMessages={setMessages} setFatalError={setfatalError} />
    </div>
  );
}

export default ChatPage;
