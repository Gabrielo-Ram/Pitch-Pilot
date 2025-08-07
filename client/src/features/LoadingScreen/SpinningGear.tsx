import { FaGear } from "react-icons/fa6";
import { BsFillHouseFill } from "react-icons/bs";

type SpinningGearProps = {
  className?: string;
};

function SpinningGear({ className }: SpinningGearProps) {
  return (
    <div className={`${className} flex flex-col justify-end items-end`}>
      <BsFillHouseFill className="size-full " />
      <FaGear className="absolute z-2 text-gray-400 size-[6%] animate-spin" />
    </div>
  );
}

export default SpinningGear;
