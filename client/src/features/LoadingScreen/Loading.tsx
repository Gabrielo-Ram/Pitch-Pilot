import SpinningGear from "./SpinningGear";

type LoadingProps = {
  className?: string;
};

/**
 * Loading
 *
 * The animated 'Loading...' component
 *
 * @component
 * @param {LoadingProps} props - The props object
 * @param {string} className - An optional class to add TailwindCSS styling.
 * @returns
 */
function Loading({ className }: LoadingProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <SpinningGear className="w-[13%]" />
      <div
        className={`flex justify-center items-end font-semibold text-white ${className}`}
      >
        <span className="mr-2 animate-pulse">Loading services</span>
        <span className="inline-block animate-pulse duration-500 delay-500 text-[180%]">
          .
        </span>
        <span className="inline-block animate-pulse duration-1000 delay-1000 text-[180%]">
          .
        </span>
        <span className="inline-block animate-pulse duration-1500 delay-1500 text-[180%]">
          .
        </span>
      </div>
      <div>
        <p className="text-[80%] my-[2%] max-w-[40%] mx-auto text-center">
          This might take a while. We'll navigate you to the next page once we
          get everything figured out on our end. We appreciate your patience!
        </p>
      </div>
    </div>
  );
}

export default Loading;
