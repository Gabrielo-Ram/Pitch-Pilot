import PitchPilotLogo from "../assets/PitchPilot Logo.png";

type FooterProps = {
  className?: string;
};

function Footer({ className }: FooterProps) {
  return (
    <div
      className={`w-full flex items-center px-[10%] pr-[15%] py-[5%] bg-blue/60 border-t-8 border-light-grey ${className}`}
    >
      <div id="logoPair" className="h-full flex items-center">
        <img
          src={PitchPilotLogo}
          alt="Pitch Pilot Logo"
          className="size-[5%]"
        />
        <h1 className="ml-3 hover:cursor-default text-4xl font-bold">
          PitchPilot
        </h1>
      </div>
      <h1 className="w-[30%] text-2xl">
        Designed by:{" "}
        <a
          className="underline hover:cursor-pointer"
          href="http://www.linkedin.com/in/gabriel-ramirez-80550a311"
          target="_blank"
        >
          Gabe Ramirez
        </a>
      </h1>
    </div>
  );
}

export default Footer;
