import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
if (!BACKEND_URL) {
  throw new Error("❌ Could not load backend URL from environment");
}

function ConnectingPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  //Call API endpoint to initiate the MCP Ecosystem
  useEffect(() => {
    setIsLoading(true);

    //Calls the backend API endpoint
    const startServer = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/mcp`, {
          method: "POST",
        });

        const data = await res.json();

        if (res.ok) {
          console.log("✓ MCP Successfully Initialized");
          //setIsLoading(false);
          setIsSuccessful(true);
        } else {
          console.log("❌ Failed to initialize MCP");
          //setIsLoading(false);
          setIsSuccessful(false);
        }
      } catch (error) {
        console.error("❌ Failed to connect to MCP: \n", error);
        //setIsLoading(false);
        setIsSuccessful(false);
      }
    };

    startServer();
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden flex justify-center items-center bg-gray-800 text-xl">
      {isLoading ? <Loading className="" /> : <h1>Succesfully loaded!</h1>}
    </div>
  );
}

export default ConnectingPage;
