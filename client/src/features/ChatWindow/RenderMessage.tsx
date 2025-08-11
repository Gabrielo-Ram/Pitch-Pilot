import ReactMarkdown from "react-markdown";
import type { Message } from "../../types";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type RenderMessagesProps = {
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
function RenderMessage({ message }: RenderMessagesProps) {
  //TODO: Fill in CSS styles for each message
  if (message.role === "model") {
    return (
      <div
        id="modelResponse"
        className=" my-[2%] py-3 px-5 rounded-xl max-w-full break-words prose prose-invert"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="font-bold mb-4 overflow-x-auto" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="font-semibold mt-8 mb-2 overflow-x-auto"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="font-bold mt-6 mb-1 overflow-x-auto" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p
                className="mb-3 leading-relaxed text-gray-100 overflow-x-auto"
                {...props}
              />
            ),
            li: ({ node, ...props }) => (
              <li
                className="list-disc list-inside ml-4 mb-1 overflow-x-auto"
                {...props}
              />
            ),
            pre: ({ node, ...props }) => (
              <pre
                className="overflow-x-auto bg-gray-900 p-5 rounded-xl text-sm"
                {...props}
              />
            ),
            code: ({ node, ...props }) => (
              <code className="overflow-x-auto" {...props} />
            ),
          }}
        >
          {message.reply}
        </ReactMarkdown>
      </div>
    );
  } else if (message.role === "user") {
    return (
      <div
        id="userMessage"
        className="self-end my-[2%] bg-gray-700/70 py-3 px-5 rounded-xl max-w-[70%] break-words prose prose-invert"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message.reply}
        </ReactMarkdown>
      </div>
    );
  }
}

export default RenderMessage;
