import { useEffect, useRef } from "react";
import RenderMessage from "./RenderMessage";
import type { Message } from "../../types";

type ChatWindowProps = {
  messages: Message[];
};

/**
 * ChatWindow @component
 * The Chat Window that renders both the user's and the AI's messages.
 *
 * @param {Message []} messages - An array of 'Message' objects that specify the role of the sender, and the message itself.
 */
function DisplayMessages({ messages }: ChatWindowProps) {
  const chatRef = useRef<HTMLDivElement>(null);

  //Automatically scrolls to the most recent chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      id="chatWindow"
      ref={chatRef}
      className="chatWindow md:h-[69%] h-[74%] w-screen px-[5%] md:px-[21%] mt-[2%] md:mt-[4.5%] flex flex-col overflow-y-scroll"
    >
      {messages.map((message, index) => {
        return <RenderMessage key={index} message={message} />;
      })}
    </div>
  );
}

export default DisplayMessages;
