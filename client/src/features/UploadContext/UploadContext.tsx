import { GoPlus } from "react-icons/go";
import { uploadFile } from "./fileUpload";
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";

type UploadContextProps = {
  setIsUploaded: (isUploaded: boolean) => void;
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
function UploadContext({ setIsUploaded }: UploadContextProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Sends the state up to the parent element when file is successfully uploaded
  const handleUpload = async (e: any) => {
    setIsLoading(true);
    const successfulUpload = await uploadFile(e);
    if (successfulUpload) setIsUploaded(true);
    setIsLoading(false);
  };

  return (
    <div className="absolute w-screen h-screen flex flex-col justify-center items-center bg-gray-600/70 z-2">
      {isLoading ? (
        <label className="size-20 flex justify-center items-center overflow-clip duration-300">
          <VscLoading className="size-[120%] animate-spin" />
        </label>
      ) : (
        <label
          htmlFor="uploadFileInput"
          className="size-20 outline-2 rounded-xl bg-gray-300/20 hover:cursor-pointer flex justify-center items-center overflow-clip hover:bg-gray-200/40 hover:outline-4 transition-all duration-300"
        >
          <input
            id="uploadFileInput"
            type="file"
            accept=".pdf"
            onChange={(e) => handleUpload(e)}
            className="hidden"
          />

          <GoPlus className="size-[120%]" />
        </label>
      )}
    </div>
  );
}

export default UploadContext;
