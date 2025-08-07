import { GoPlus } from "react-icons/go";
import { uploadFile } from "./fileUpload";

type UploadContextProps = {
  className?: string;
  setIsLoading: any;
  setMessages: any;
};

/**
 * UploadedContext Component
 *
 * Renders a full-screen overlay that prompts the user to upload a PDF file
 * This component sends the PDF file to the backend, and notifies the parent
 * component when the upload succeeds.
 *
 * @component
 *
 * @param {(setIsUploaded: boolean) => void} props.setIsUploaded - Callback useState function to update the parent when upload is complete
 */
function UploadContext({
  className,
  setIsLoading,
  setMessages,
}: UploadContextProps) {
  //Sends the state up to the parent element when file is successfully uploaded
  const handleUpload = async (e: any) => {
    setIsLoading(true);
    const response = await uploadFile(e);

    setMessages((prevMessages: any) => [
      ...prevMessages,
      {
        role: "user",
        reply: "[ File Uploaded ]",
      },
      {
        role: "model",
        reply: response,
      },
    ]);
    setIsLoading(false);
  };

  return (
    <div className={`flex flex-col justify-center items-center ${className}`}>
      <label
        htmlFor="uploadFileInput"
        className="rounded-md h-full hover:cursor-pointer flex justify-center items-center overflow-clip hover:bg-gray-200/40 transition-all duration-300"
      >
        <input
          id="uploadFileInput"
          type="file"
          accept=".pdf"
          onChange={(e) => handleUpload(e)}
          className="hidden"
        />

        <GoPlus className="size-[110%]" />
      </label>
    </div>
  );
}

export default UploadContext;
