import { IoIosInformation } from "react-icons/io";
import ReactMarkdown from "react-markdown";

type MoreInfoProps = {
  className?: string; //TailwindCSS classes
  toolTipText?: string;
};

function MoreInfo({ className, toolTipText }: MoreInfoProps) {
  return (
    <div className={`group ${className}`}>
      <div
        className={`border-2 rounded-3xl overflow-hidden flex justify-center`}
      >
        <IoIosInformation className="size-[160%] mx-auto" />
      </div>

      {toolTipText && (
        <div className="absolute opacity-0 top-[50%] left-[120%] mb-2 hidden w-[1500%] group-hover:block group-hover:opacity-100 bg-gray-600 text-sm px-2 py-1 rounded-xl transition-opacity duration-400">
          <ReactMarkdown>{toolTipText}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default MoreInfo;

// return (
//   <div className={`relative group inline-block ${className}`}>
//     <div className="hover:cursor-pointer border-1 rounded-3xl overflow-hidden flex justify-center items-center">
//       <IoIosInformation className="size-[160%] mx-auto" />
//     </div>

//     {toolTipText && (
//       <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow z-10 whitespace-nowrap">
//         {toolTipText}
//       </div>
//     )}
//   </div>
// );
