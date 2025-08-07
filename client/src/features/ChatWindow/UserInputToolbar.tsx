import { FaArrowUp } from "react-icons/fa";
import { RiGeminiFill } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";
import UploadContext from "../UploadContext/UploadContext";

type UserInputToolbarProps = {
  className?: string;
  isLoading: boolean;
  setIsLoading: any;
  handleSubmit: () => void;
  setMessages: any;
};

function UserInputToolbar({
  className,
  isLoading,
  setIsLoading,
  handleSubmit,
  setMessages,
}: UserInputToolbarProps) {
  return (
    <div className={`w-full h-[30%] px-1 flex justify-between ${className}`}>
      <UploadContext setIsLoading={setIsLoading} setMessages={setMessages} />
      <span className="text-sm flex items-end">
        <RiGeminiFill className="mr-2 h-[80%] w-[15%]" />
        Powered by Gemini
      </span>
      {isLoading ? (
        <VscLoading className="animate-spin h-full" />
      ) : (
        <FaArrowUp
          className="h-[90%] w-[6%] rounded-2xl outline-2 outline-gray-700 bg-gray-700/40 hover:rounded-sm hover:bg-gray-200/40 transition-all duration-300 hover:cursor-pointer place-self-end"
          onClick={handleSubmit}
        />
      )}
    </div>
  );
}

export default UserInputToolbar;
