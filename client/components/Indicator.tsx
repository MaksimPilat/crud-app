import React from "react";

interface IIndicator {
  flag: boolean;
}

const Indicator: React.FC<IIndicator> = ({ flag }: IIndicator) => {
  return (
    <svg
      className={`w-3 h-3 mx-3 ${flag ? "text-green-500" : "text-red-500"}`}
      fill="currentColor"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};

export default Indicator;
