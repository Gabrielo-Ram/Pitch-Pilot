import { useEffect, useState } from "react";
import UploadContext from "../features/UploadContext/UploadContext";
import DisplayMessages from "../features/ChatWindow/DisplayMessages";
import SubmitMessage from "../features/ChatWindow/SubmitMessage";
import Navbar from "../components/Navbar";
import type { Message } from "../types";

function ChatPage() {
  const [isUploaded, setIsUploaded] = useState<boolean>(true); //<-- Change to 'false'
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  //Content that guides the user on how to use this page.
  const toolTipText = `Talk to Gemini about your pitch deck through this chat window! Simply type your query and hit 'Enter' to submit it to Gemini. 
  You can ask Gemini to help you with any of the following:
  - · **Review your deck**
  - · **Create a short-form 2-minute version of your deck**
  - · **Create a one-pager for your solution**`;

  //Initiate the 'Engage MCP Server' endpoint on first render of this page
  useEffect(() => {
    // setIsLoading(true);
    //TODO: We are not going to place this fetch statement in ChatPage.
    //Instead, we are going to start the MCP Server at a seperate page
    //to better manage state
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col place-items-center bg-gray-800 text-xl">
      {!isUploaded && <UploadContext setIsUploaded={setIsUploaded} />}
      <Navbar showToolTip={true} toolTipText={toolTipText} />
      <DisplayMessages messages={messages} />
      <SubmitMessage setMessages={setMessages} />
    </div>
  );
}

export default ChatPage;
