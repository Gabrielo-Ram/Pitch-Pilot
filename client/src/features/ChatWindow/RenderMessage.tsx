import ReactMarkdown from "react-markdown";
import type { Message } from "../../types";

type RenderMessagesProps = {
  key: string | number;
  message: Message;
};

/**
 * RenderMessage
 *
 * Renders a single chat message based on its role ("model" or "user")
 *
 * @component
 * @param {RenderMessagesProps} props - The props object
 * @param {string | key} props.key - A unique key for the rendered message
 * @param {{ role: 'model' | 'user', reply: string }} props.message - The message object containing the sender role and content.
 */
function RenderMessage({ key, message }: RenderMessagesProps) {
  //TODO: Fill in CSS styles for each message
  if (message.role === "model") {
    return (
      <div
        id="modelResponse"
        className=" my-[2%] py-3 px-5 rounded-xl max-w-[90%] break-words"
      >
        <ReactMarkdown key={key}>{message.reply}</ReactMarkdown>
      </div>
    );
  } else if (message.role === "user") {
    return (
      <div
        id="userMessage"
        className="self-end my-[2%] bg-gray-700/70 py-3 px-5 rounded-xl max-w-[70%] break-all"
      >
        <ReactMarkdown key={key}>{message.reply}</ReactMarkdown>
      </div>
    );
  }
}

export default RenderMessage;
