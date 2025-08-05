import { TfiFaceSad } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

function FatalErrorPage() {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center w-[50%] h-screen justify-self-center md:text-3xl text-2xl">
      <TfiFaceSad className="size-[30%] my-[5%]" />
      <p className="text-center">
        <b>Something went very wrong</b>. Please try again in a couple of
        minutes. If that doesn't work... please send{" "}
        <a
          href="https://www.linkedin.com/in/gabriel-ramirez-80550a311/"
          target="_blank"
          className="underline"
        >
          Gabe Ramirez
        </a>{" "}
        a message.
      </p>
      <div
        className="outline-1 w-[35%] text-center my-[4%] py-2 px-3 rounded-xl bg-gray-600 hover:cursor-pointer hover:outline-3 hover:bg-blue-900 hover:rounded-lg transition-all duration-200"
        onClick={navigateHome}
      >
        <p>Navigate home</p>
      </div>
    </div>
  );
}

export default FatalErrorPage;
