// Footer.tsx
import React from "react";
import "../../app/globals.css";
import { AtSign, Copyright,  Facebook, MessageCircleMore, SendHorizontal, Smartphone, Twitter } from "lucide-react";
const Footer: React.FC = () => {
  return (
    <footer className="footer flex items-center h-30 w-full border-t text-white ">
      <div>
        <img src="/myLogo.png" alt="logo" width={50} height={50} />
      </div>
      <div className="text-center md:w-full flex justify-center space-x-2" >
      <div className="text-sm md:text-base ">My Bio-History</div>
      <Copyright color="lightblue"/>
      </div>
      <div className=" ml-auto origin-bottom-right grid  grid-rows-2 grid-cols-3 md:px-15 md:flex md:flex-col text-sm font-thin md:flex-wrap md:space-x-3 h-20 rounded-2xl  md:justify-end ">
        <div className="flex space-x-3 ">
        <Facebook color="blue" />
        <p className="hidden md:block underline underline-offset-4 decoration-blue-400">Facebook</p>
        </div>
        <div className="flex space-x-3 ">
        <Twitter color="skyblue"/>
        <p className="hidden md:block underline underline-offset-4 decoration-blue-400">Twitter</p>
        </div>
        <div className="flex space-x-3">
        <AtSign color="orange"/>
        <p className="hidden md:block underline underline-offset-4 decoration-blue-400">Email</p>
        </div>
        <div className="flex space-x-3">
        <SendHorizontal color="white"/>
        <p className="hidden md:block underline underline-offset-4 decoration-blue-400">Telegram</p>
        </div>
        <div className="flex space-x-3">
        <MessageCircleMore color="green"/>
        <p className="hidden md:block underline underline-offset-4 decoration-blue-400">WhatsApp</p>
        </div>
        <div className="flex space-x-3">
        <Smartphone color="green"/>
        <p className="hidden md:block underline underline-offset-4 decoration-blue-400">0923-254658</p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
