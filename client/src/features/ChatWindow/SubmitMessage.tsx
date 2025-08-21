import { useState, type SetStateAction } from "react";
import "./../../index.css";
import type { Message } from "../../types";
import type { Dispatch } from "react";
import UserInputToolbar from "./UserInputToolbar";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
if (!BACKEND_URL) {
  throw new Error("❌ Could not load backend URL from environment");
}

type SubmitMessageProps = {
  //Specifies that the type of 'setMessages' must be a useState setter function
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setFatalError: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * SubmitMessage
 *
 * Handles logic for submitting a user's query to MCP and retrieving the MCP's response.
 *
 * @component
 * @param {SubmitMessageProps} props - The props object
 * @param {Dispatch<SetStateAction<Message[]>>} setMessages - The useState setter function that updates an 'Message[]' state variable in the parent component
 */
function SubmitMessage({ setMessages, setFatalError }: SubmitMessageProps) {
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Submits the user's message to chat window and MCP Ecosystem
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const recentMessage = userInput;

      //Render the user's message onto the chat terminal
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "user",
          reply: userInput,
        },
      ]);

      setUserInput("");

      //Send user query to MCP and get Gemini's response
      const res = await fetch(`${BACKEND_URL}/mcp/processQuery`, {
        method: "POST",
        headers: { "Content-Type": "application/json " },
        body: JSON.stringify({ message: recentMessage }),
      });

      if (!res.ok)
        console.error(
          "❌ SubmitMessage.tsx: Gemini returned an invalid response"
        );

      //Save Gemini's response into the frontend 'messages' array.
      const data = await res.json();
      setMessages((prevMessages) => [...prevMessages, data]);

      setUserInput("");
      setIsLoading(false);
    } catch (error) {
      console.error("❌ Failed send message to MCP Server");
      setFatalError(true);
    }
  };

  return (
    <div className="h-[23%] md:h-[18%] md:w-[58%] w-[90%] border-1 border-gray-500 absolute top-[75%] md:top-[79%] rounded-2xl bg-gray-900 py-3 px-5 text-[90%]">
      <textarea
        id="userInput"
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
          }
        }}
        placeholder="Ask anything"
        className="submitMessage w-[100%] h-[60%] md:h-[70%] focus:outline-none overflow-y-visible px-1 py-2 xl:text-2xl"
        disabled={isLoading}
      ></textarea>
      <UserInputToolbar
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        handleSubmit={handleSubmit}
        setMessages={setMessages}
      />
    </div>
  );
}

export default SubmitMessage;
