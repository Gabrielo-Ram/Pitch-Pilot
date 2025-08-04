type LoadingProps = {
  className?: string;
};

function Loading({ className }: LoadingProps) {
  return (
    <div
      className={`flex justify-center items-center text-xl font-semibold text-white ${className}`}
    >
      <span className="animate-pulse">Loading</span>
      <span className="inline-block animate-bounce delay-0">.</span>
      <span className="inline-block animate-bounce delay-150">.</span>
      <span className="inline-block animate-bounce delay-300">.</span>
    </div>
  );
}

export default Loading;
