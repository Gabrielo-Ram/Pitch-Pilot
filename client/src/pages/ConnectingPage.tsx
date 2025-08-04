import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { TfiFaceSad } from "react-icons/tfi";
import { FaRegThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
if (!BACKEND_URL) {
  throw new Error("❌ Could not load backend URL from environment");
}

/**
 * ConnectingPage
 *
 * The 'Loading' page the user hits while the MCP Server is
 * spinning up
 *
 * @component
 */
function ConnectingPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const navigate = useNavigate();

  //If the server starts successfully, navigate to the next page
  if (isSuccessful) {
    navigate("/chat");
  }

  //Call API endpoint to initiate the MCP Ecosystem
  useEffect(() => {
    setIsLoading(true);

    //Calls the backend API endpoint
    const startServer = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/mcp`, {
          method: "POST",
        });

        await res.json();

        if (res.ok) {
          console.log("✓ MCP Successfully Initialized");
          setIsSuccessful(true);
        } else {
          console.log("❌ Failed to initialize MCP");
          setIsSuccessful(false);
        }
      } catch (error) {
        console.error("❌ Failed to connect to MCP: \n", error);
        setIsSuccessful(false);
      } finally {
        setIsLoading(false);
      }
    };

    startServer();
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden flex justify-center items-center bg-gray-800 text-xl">
      {isLoading ? (
        <Loading className="text-5xl" />
      ) : isSuccessful ? (
        <div className="flex flex-col justify-center items-center w-[40%]">
          <FaRegThumbsUp className="size-[30%] my-[5%]" />
          <p className="text-center">
            <b>Success!</b>. What are you still doing here? You should have been
            re-directed to the next page.{" "}
            <a
              className="underline hover:cursor-pointer"
              onClick={() => navigate("/chat")}
            >
              Click here
            </a>{" "}
            to go to the next page.
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-[50%]">
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
        </div>
      )}
    </div>
  );
}

export default ConnectingPage;
