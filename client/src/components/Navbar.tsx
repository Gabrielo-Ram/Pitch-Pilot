import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MoreInfo from "./MoreInfo";

type NavBarProps = {
  showToolTip?: boolean;
  toolTipText?: string;
};

/**
 * Navbar
 *
 * The Navbar component that holds the following information:
 *  - The website title
 *  - A button that navigates to the 'Home' page
 *  - An optional tooltip function
 *
 * @component
 * @returns
 */
function Navbar({ showToolTip, toolTipText }: NavBarProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[8%] border-b-1 border-gray-500 absolute flex items-center justify-between px-[5%]">
      <h1 className="text-4xl font-bold">
        PitchPilot
        <span className="text-[35%] pl-3 font-medium text-gray-300">
          Made by: Gabe Ramirez
        </span>
      </h1>
      {showToolTip && (
        <MoreInfo
          className="absolute top-[35%] left-1/2 w-[2%]"
          toolTipText={toolTipText}
        />
      )}
      <div
        onClick={() => navigate("/")}
        className="h-[80%] p-1 outline-2 rounded-xl hover:rounded-lg hover:bg-gray-500 hover:cursor-pointer transition-all duration-200"
      >
        <FaHome className="size-full" />
      </div>
    </div>
  );
}

export default Navbar;
