import { NextComponentType } from "next";

import Github from "public/assets/images/Github.svg";
import Linkedin from "public/assets/images/Linkedin.svg";
import { appTitle } from "utils/constants";

const AppBar: NextComponentType = () => {
  const handleRefresh = () => {
    window.location.href = "/";
  };

  return (
    <div className="mb-16">
      <nav className="py-3 px-4 fixed top-0 w-full shadow-sm bg-white border-b border-slate-300 z-10">
        <div className="container mx-auto flex justify-between opacity-70 items-center">
          <a href="/" className="text-1xl font-bold " onClick={handleRefresh}>
            {appTitle}
          </a>
          <div className="flex gap-3">
            <a
              href="https://github.com/evanigwilo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Github.src} alt="Github" className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/evanigwilo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Linkedin.src} alt="Linkedin" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppBar;
