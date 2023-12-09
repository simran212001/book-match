import { NextComponentType } from "next";

const Spinner: NextComponentType = () => {
  return (
    <div className="animate-spin rounded-full border-t-4 border-gray-700 border-solid h-8 w-8"></div>
  );
};

export default Spinner;
