import React from "react";
import "../../app/globals.css";
import { AtSign, Copyright, Smartphone } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="footer flex items-center h-30 w-full border-t text-white px-4 md:px-10">
      {/* Logo */}
      <div>
        <img src="/logoplaceholder.png" alt="logo" width={50} height={50} />
      </div>

      {/* Titolo centrale */}
      <div className="text-center md:w-full flex justify-center space-x-2">
        <div className="text-sm md:text-base">My Bio-History</div>
        <Copyright color="lightblue" />
      </div>

      {/* Contatti */}
      <div className="ml-auto flex flex-col gap-2 items-end text-sm font-thin">
        {/* Email */}
        <div className="flex items-center space-x-2">
          <AtSign color="orange" aria-label="Email Icon" />
          <p className="underline underline-offset-4 decoration-blue-400">
            email@example.com
          </p>
        </div>

        {/* Telefono */}
        <div className="flex items-center space-x-2">
          <Smartphone color="green" aria-label="Phone Icon" />
          <p className="underline underline-offset-4 decoration-blue-400">
            0923-254658
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

