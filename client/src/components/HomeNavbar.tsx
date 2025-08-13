import { useNavigate } from "react-router-dom";
import PitchPilotLogo from "../assets/PitchPilot Logo.png";
import Button from "./Button";

type HomeNavbarProps = {
  className?: string;
};

/**
 * The Navbar component that is placed on the 'Home' Page
 * @component
 */
function HomeNavbar({ className }: HomeNavbarProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`w-full h-[11%] absolute flex items-center justify-between px-[5%] text-3xl font-bold mt-3 overflow-hidden ${className}`}
    >
      <div id="logoPair" className="flex items-center h-full">
        <div id="logoImage" className="h-[87%]">
          <img
            src={PitchPilotLogo}
            alt="Pitch Pilot Logo"
            className="rounded-4xl h-full"
          />
        </div>
        <h1 className="ml-3 hover:cursor-default">PitchPilot</h1>
      </div>

      <div
        id="pageNavigation"
        className="flex items-center h-full text-base gap-15 text-gray-300"
      >
        <a href="#features">
          <p className="h-full flex items-center hover:cursor-pointer hover:border-b-2 transition-all duration-300">
            Features
          </p>
        </a>
        <a href="#howitworks">
          <p className="h-full flex items-center hover:cursor-pointer hover:border-b-2 transition-all duration-300">
            How It Works
          </p>
        </a>
        <a href="#faq">
          <p className="h-full flex items-center hover:cursor-pointer hover:border-b-2 transition-all duration-300">
            FAQ
          </p>
        </a>
      </div>

      <div id="getStarted" className="flex items-center h-full">
        <Button onClick={() => navigate("/connectToServer")}>
          Chat with Gemini
        </Button>
      </div>
    </div>
  );
}
//client/src/assets/PitchPilot Logo.png
export default HomeNavbar;
