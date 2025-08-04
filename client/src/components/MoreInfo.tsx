import { IoIosInformation } from "react-icons/io";
import ReactMarkdown from "react-markdown";

type MoreInfoProps = {
  className?: string; //TailwindCSS classes
  toolTipText?: string;
};

/**
 * MoreInfo
 *
 * Adds an `ⓘ` icon with customizable tooltip text.
 *
 * @component
 * @param {MoreInfoProps} props - The props object
 * @param {string} className - Optional classes for TailwindCSS styling
 * @param {string} toolTipText - Optional text content to include on-hover of this component.
 * @returns
 */
function MoreInfo({ className, toolTipText }: MoreInfoProps) {
  return (
    <div className={`group ${className}`}>
      <div
        className={`border-2 rounded-3xl overflow-hidden flex justify-center`}
      >
        <IoIosInformation className="size-[160%] mx-auto" />
      </div>

      {toolTipText && (
        <div className="w-[1400%] mt-2 text-sm px-3 py-2 rounded-lg bg-gray-700 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
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
