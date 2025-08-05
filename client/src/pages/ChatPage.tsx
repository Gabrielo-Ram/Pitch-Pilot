import { useEffect, useState } from "react";
import UploadContext from "../features/UploadContext/UploadContext";
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
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [fatalError, setfatalError] = useState<boolean>(false);
  const navigate = useNavigate();

  //Content that guides the user on how to use this page.
  const toolTipText = `Talk to Gemini about your pitch deck through this chat window! Simply type your query and hit 'Enter' to submit it to Gemini. 
  You can ask Gemini to help you with any of the following:
  - · **Review your deck**
  - · **Create a short-form 2-minute version of your deck**
  - · **Create a one-pager for each company in your presentation batch (if you uploaded a compilation of multiple startup decks)**`;

  //Navigate to 'Error' page if we ever encounter a fatal error
  if (fatalError) navigate("/error");

  //Send system prompt to Gemini upon first render
  useEffect(() => {
    const sendSystemPrompt = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/mcp/sendContext`, {
          method: "POST",
        });

        if (!res.ok) setfatalError(true);
      } catch (error) {
        console.error(`❌ Failed to send system prompt to MCP: \n${error}`);
        setfatalError(true);
      }
    };

    sendSystemPrompt();
  }, []);

  //Once the user uploads a PDF file, queue Gemini to start chatting with the user
  useEffect(() => {
    if (isUploaded) {
      //Async function wrapper to allow for 'await'
      const queueGemini = async () => {
        try {
          const res = await fetch(`${BACKEND_URL}/mcp/processQuery`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: "Please review the pitch deck I provided",
            }),
          });

          if (!res.ok) setfatalError(true);

          //Sets the frontend 'messages' array to Gemini's response.
          const data = await res.json();

          setMessages([data]);

          console.log("✓ Successfully queued Gemini");
        } catch (error) {
          console.error(
            "❌ Failed to queue Gemini to communicate with the user"
          );
          setfatalError(true);
        }
      };

      queueGemini();
    }
  }, [isUploaded]);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col place-items-center bg-gray-800 text-xl">
      {!isUploaded && <UploadContext setIsUploaded={setIsUploaded} />}
      <Navbar showToolTip={true} toolTipText={toolTipText} />
      <DisplayMessages messages={messages} />
      <SubmitMessage setMessages={setMessages} setFatalError={setfatalError} />
    </div>
  );
}

export default ChatPage;
