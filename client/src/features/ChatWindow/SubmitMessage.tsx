import { useState, type SetStateAction } from "react";
import "./../../index.css";
import { FaArrowUp } from "react-icons/fa";
import { RiGeminiFill } from "react-icons/ri";
import type { Message } from "../../types";
import type { Dispatch } from "react";
import { VscLoading } from "react-icons/vsc";

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
 * Handles logic for submitting a user's query to MCP, updating frontend chat
 * window to reflect Gemini's response.
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

      const data = await res.json();
      setMessages((prevMessages) => [...prevMessages, data]);

      setUserInput("");
      setIsLoading(false);
    } catch (error) {
      console.error("❌ Failed to connect to server");
      setFatalError(true);
    }
  };

  return (
    <div className="h-[22%] md:h-[15%] md:w-[58%] w-[90%] border-1 border-gray-500 absolute top-[75%] md:top-[79%] rounded-2xl bg-gray-900 py-4 px-5 text-[90%]">
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
        className="submitMessage w-[96%] h-[70%] md:h-full focus:outline-none overflow-y-visible"
        disabled={isLoading}
      ></textarea>
      {!isLoading && (
        <VscLoading className="absolute h-fit animate-spin top-[70%]" />
      )}
      <div
        id="submitButton"
        className="md:hidden ml-[75%] outline-2 px-1 py-2 my-1 h-[30%] w-[20%] flex justify-center items-center rounded-xl hover:bg-blue-800 hover:cursor-pointer hover:rounded-none transition-all duration-400"
      >
        <FaArrowUp className="size-[120%]" />
      </div>
      <div className="hidden md:flex items-center md:justify-center md:mt-[2%] md:text-sm md:text-gray-300 md:w-full">
        <p className="w-1/4 flex items-center">
          <RiGeminiFill className="mx-2" />
          Powered by Gemini
        </p>
      </div>
    </div>
  );
}

export default SubmitMessage;
