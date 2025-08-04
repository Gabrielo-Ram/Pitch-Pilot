import { GoPlus } from "react-icons/go";
import { uploadFile } from "./fileUpload";

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
  //Sends the state up to the parent element when file is successfully uploaded
  const handleUpload = async (e: any) => {
    const successfulUpload = await uploadFile(e);
    if (successfulUpload) setIsUploaded(true);
  };

  return (
    <div className="absolute w-screen h-screen flex flex-col justify-center items-center bg-gray-300/20 z-2">
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
    </div>
  );
}

export default UploadContext;
