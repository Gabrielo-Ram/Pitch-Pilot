import { useNavigate } from "react-router-dom";
//Icons
import { FaGear } from "react-icons/fa6";
import { AiFillBulb } from "react-icons/ai";
import { RiPagesFill } from "react-icons/ri";
import AIClipart from "../assets/artificial-intelligence.png";
import ChatWindowClipart from "../assets/Chat Window Clipart.png";
import PromptGeminiClipart from "../assets/Prompt Clipart.png";
import FileClipart from "../assets/FileClipart.png";
//React components
import Section from "../components/Section";
import HomeNavbar from "../components/HomeNavbar";
import Button from "../components/Button";
import FeaturesCard from "../components/FeaturesCard";
import Step from "../components/Step";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  const questionsArray = [
    {
      question: "Do I need an account?",
      answer: "Nope, no login required.",
    },
    {
      question: "What file do I need to upload?",
      answer: "Your upload MUST BE a PDF file.",
    },
    {
      question: "How does Gemini generate the output?",
      answer:
        "Outputs are delivered as PPTX files. You can import this file into any presentation editor you look like to use.",
    },
    {
      question: "Is my data private?",
      answer:
        "Yes! Outputs are deleted right after the download is prepared. Your content is sent to Gemini only to generate your results. Your decks are not used to train the model.",
    },
    {
      question: "How long does it take?",
      answer:
        "It's pretty quick! Depending on the deck length and the server load-time, you could get your new deck template in minutes.",
    },
    {
      question: "What if my PDF is mostly images/screenshots?",
      answer:
        "Text extraction may be limited. Include real text where possible, or paste key details when Gemini asks for them.",
    },
    {
      question: "What will the 2-minute deck include?",
      answer:
        "A 7-slide cut that highlights: Problem -> Solution -> Market -> Traction -> Ask, in a clear narrative order.",
    },
    {
      question: "Do I keep my brand fonts/colors?",
      answer:
        "The presentation we produce is meant to be a template. We do not preserve the color scheme or styling of your original presentation.",
    },
    {
      question: "Can I create one-pagers for multiple companies at once?",
      answer:
        "Yes! Upload a compilation of decks to generate a deck of one-pagers (one per company).",
    },
  ];

  const navigateHome = () => {
    navigate("/connectToServer");
  };

  return (
    <>
      <HomeNavbar className="md:flex hidden" />

      <Section
        id="hero"
        className="md:pt-[12%] pt-[20%] grid grid-cols-1 md:grid-cols-5 grid-rows-2  bg-gradient-to-b from-dark-grey to-blue/30"
      >
        <h1
          id="header"
          className="text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold col-span-5 lg:col-span-3 flex flex-col justify-end"
        >
          <span className="bg-gradient-to-br from-white text-[120%] to-blue bg-clip-text text-transparent">
            Shorten
          </span>{" "}
          your pitch deck &{" "}
          <span className="bg-gradient-to-br from-white text-[110%] to-blue bg-clip-text text-transparent">
            create one-pagers
          </span>{" "}
          — in seconds
        </h1>
        <div
          id="sub-header"
          className="text-3xl font-bold row-start-2 col-span-5 lg:col-span-3 flex flex-col justify-center"
        >
          <p className="text-gray-400 xl:pr-30">
            Leverage Google Gemini to refine and condense your pitch deck in an
            instant
          </p>
          <Button
            className="w-[40%] mx-auto md:mx-0 md:w-[35%] sm:w-[30%] my-[5%]"
            onClick={navigateHome}
          >
            Chat with Gemini
          </Button>
        </div>
        <div
          id="heroImage"
          className="border-1 border-amber-400 hidden lg:block lg:col-span-2 lg:row-span-2"
        ></div>
      </Section>

      <Section
        id="whyUs?"
        className="!h-[80%] px-0! py-[10%] bg-gradient-to-b from-blue/30 to-blue/20"
      >
        <div className="grid grid-cols-7 gap-[5%] bg-gradient-to-r from-light-grey/80 to-blue w-full pl-10 pr-12 2xl:pr-0 py-[7%] text-gray-900">
          <h1 className="font-bold text-3xl md:text-4xl flex items-center col-span-3 text-center text-dark-grey">
            You shouldn't waste hours reformatting a deck
          </h1>
          <div className="size-full hidden lg:block">
            <img
              src={AIClipart}
              alt="Clipart of an AI icon"
              className="size-full"
            />
          </div>
          <h1 className="font-bold text-2xl md:text-3xl flex items-center col-start-5 col-span-3 text-center text-gray-300">
            Let Gemini do the heavy lifting for you
          </h1>
        </div>
      </Section>

      <Section
        id="features"
        className="h-[200%]! bg-gradient-to-b from-blue/20 to-blue/30 border-b-1 border-dark-grey"
      >
        <h1 className="text-5xl font-bold text-center">Core Features</h1>
        <p className="text-2xl font-semibold text-center text-gray-300 pt-5 pb-[7%]">
          Focused and fast outputs — all in workflow you recognize
        </p>

        <div
          id="cards"
          className="grid grid-cols-1 lg:grid-cols-3 grid-rows-3 lg:h-[70%] px-[4%] gap-x-[6%] gap-y-[4%]"
        >
          <FeaturesCard className="row-span-1 lg:row-span-3 gap-y-3">
            <div className="size-[25%]">
              <AiFillBulb className="size-full" />
            </div>
            <h1 className="text-3xl font-bold">AI Deck Review</h1>
            <p className="text-2xl lg:text-xl lg:pt-[8%] pl-2">
              Gemini offers slide-by-slide guidance that sharpens{" "}
              <b>clarity, storytelling, and structure</b> for your pitch deck.
            </p>
          </FeaturesCard>

          <FeaturesCard className="row-span-1 lg:row-span-3 gap-y-3">
            <div className="size-[25%]">
              <FaGear className="size-full" />
            </div>
            <h1 className="text-3xl font-bold">Short-Form Deck</h1>
            <p className="text-2xl lg:text-xl lg:pt-[8%] pl-2">
              Ask Gemini to condense your deck into a 7-slide template designed
              for demo days and first meetings.
            </p>
          </FeaturesCard>

          <FeaturesCard className="row-span-1 lg:row-span-3 gap-y-3">
            <div className="size-[25%]">
              <RiPagesFill className="size-full" />
            </div>
            <h1 className="text-3xl font-bold">One-Pager</h1>
            <p className="text-2xl lg:text-xl lg:pt-[8%] pl-2">
              Ask Gemini to generate a one-pager that clearly presents your
              solutions and unique metrics.
            </p>
          </FeaturesCard>
        </div>

        <div
          id="featuresCTA"
          className="w-full flex justify-center mt-[9%] mb-[10%]"
        >
          <Button
            onClick={navigateHome}
            className="w-[30%] md:w-[20%] text-2xl! py-4 px-3"
          >
            Chat with Gemini
          </Button>
        </div>
      </Section>

      <Section
        id="howitworks"
        className="bg-gradient-to-b h-[200%]! from-blue/20 to-blue/10 pb-[15%] pt-[10%]"
      >
        <h1 className="text-5xl font-bold text-center mb-[5%]">How It Works</h1>
        <div
          id="stepsWrapper"
          className="flex flex-col justify-center w-[90%] mx-auto"
        >
          <Step stepNumber="1" stepTitle="Upload a PDF file of your deck(s)">
            <div
              id="chatwindowclipart"
              className="hidden md:flex md:col-start-1 pl-6 justify-center items-center"
            >
              <img
                src={ChatWindowClipart}
                alt="Chat Window Clipart"
                className="size-[80%]"
              />
            </div>
            <div className="col-start-1 md:col-start-2 my-auto md:text-xl [&>*]:my-3 p-8">
              <p>
                Chat with Gemini by navigating to the chat window! Gemini has
                been directed to provide clear, actionable suggestions for a
                startup company's pitch deck:
              </p>
              <ul className="ml-8 list-disc">
                <li>What's working well?</li>
                <li>What's missing or unclear?</li>
                <li>
                  Does the pitch clearly cover the pain point being solved?
                </li>
                <li>How does the company solve it?</li>
                <li>Who is the solution for and why now?</li>
              </ul>
              <p>
                Gemini provides a complete assessment of these properties and
                more. Want more detail? Just ask.
              </p>
              <p>
                To get started, all you have to do is upload a PDF file of your
                pitch deck presentation!
              </p>
            </div>
          </Step>
          <Step
            stepNumber="2"
            stepTitle="Prompt Gemini for one of our features"
          >
            <div
              id="chatwindowclipart"
              className="hidden md:block md:col-start-1 pl-6"
            >
              <img
                src={PromptGeminiClipart}
                alt="Chat Window Clipart"
                className=""
              />
            </div>
            <div className="col-start-1 md:col-start-2 my-auto md:text-xl [&>*]:my-5 p-8">
              <p>
                At any point during your chat, prompt Gemini with the following:
              </p>
              <ul className="ml-5 italic list-disc [&>*]:my-1">
                <li>"Can you create a short-form deck for my company?"</li>
                <li>"Can you create a one-pager for me?"</li>
              </ul>
              <p>
                Gemini may ask for some additional information before creating
                your decks.
              </p>
              <p>Don't worry, it's all part of the plan!</p>
            </div>
          </Step>
          <Step stepNumber="3" stepTitle="Download your presentation">
            <div
              id="chatwindowclipart"
              className="hidden md:flex md:col-start-1 pl-6 justify-center items-center"
            >
              <img
                src={FileClipart}
                alt="Chat Window Clipart"
                className="size-[90%]"
              />
            </div>
            <div className="col-start-1 md:col-start-2 my-auto md:text-xl [&>*]:my-5 p-8">
              <p>
                Gemini will take a few moments to generate your deck template.
              </p>
              <p>
                When it's ready, the editable Microsoft Powerpoint file will
                download automatically.
              </p>
              <p>
                Import the file into any presentation editor and add your
                finishing touches!
              </p>
            </div>
          </Step>
        </div>
      </Section>

      <Section
        id="faq"
        className="bg-gradient-to-b from-blue/10 to-dark-grey pt-[10%] h-[90%]!"
      >
        <h1 className="text-5xl font-bold text-center mb-[5%]">FAQ</h1>
        <div
          id="questionsContainer"
          className="grid grid-cols-1 grid-rows-9 md:grid-cols-3 md:grid-rows-3 font-bold text-xl gap-4"
        >
          {questionsArray.map((item, index) => (
            <div key={index} className="[&>*]:my-1 p-5">
              <p>{item.question}</p>
              <p className="text-gray-400">{item.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </>
  );
}

export default Home;
