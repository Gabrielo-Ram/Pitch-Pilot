import { useState, type SetStateAction } from "react";
import "./../../index.css";
import { FaArrowUp } from "react-icons/fa";
import { RiGeminiFill } from "react-icons/ri";
import type { Message } from "../../types";
import type { Dispatch } from "react";

type SubmitMessageProps = {
  //Specifies that the type of 'setMessages' must be a useState setter function
  setMessages: Dispatch<SetStateAction<Message[]>>;
};

/**
 * SubmitMessage
 *
 * Handles logic for submitting a user's query
 * @component
 * @param {SubmitMessageProps} props - The props object
 * @param {Dispatch<SetStateAction<Message[]>>} setMessages - The useState setter function that updates an 'Message[]' state variable in the parent component
 */
function SubmitMessage({ setMessages }: SubmitMessageProps) {
  const [userInput, setUserInput] = useState<string>("");

  //On-submit, pass the user's message to the parent component and clear the input field
  const handleSubmit = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "user",
        reply: userInput,
      },
    ]);

    setUserInput("");
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
        className="submitMessage w-full h-[70%] md:h-full focus:outline-none overflow-y-visible"
      ></textarea>
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
