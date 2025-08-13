type FeaturesCardProps = {
  className?: string;
  children: React.ReactNode;
};

function FeaturesCard({ className, children }: FeaturesCardProps) {
  return (
    <div
      className={`rounded-xl border-1 border-light-grey hover:-translate-y-0.5 hover:cursor-default transition-all duration-400 bg-blue pt-10 pb-6 px-5 md:flex md:flex-col md:items-center ${className}`}
    >
      {children}
    </div>
  );
}

export default FeaturesCard;
