import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 h-screen w-screen border-1 border-gray-600 flex flex-col justify-center place-items-center">
      <h1 className="text-6xl font-bold h-1/8">This is the Home Page</h1>
      <button
        onClick={() => navigate("/connectToServer")}
        className="border-3 h-1/10 w-1/8 rounded-2xl hover:bg-gray-600 hover:cursor-pointer hover:border-4 transition-all duration-300"
      >
        Navigate to 'Connecting' Page
      </button>
    </div>
  );
}

export default Home;
