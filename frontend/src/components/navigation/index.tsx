"use client";
import { useState } from "react";
import React from "react";
import Link from "next/link";
import Sidebar from "./sidebar";
import Navbar from "./navbar";


const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />

    <div className="sidebar-container fixed w-full h-full overflow-hidden 
   justify-center bg-white grid pt-[120px] left-0 z-10"
  style={{ opacity: `${isOpen ? "1" : "0"}`, 
      top: ` ${isOpen ? "0" : "-100%"}`}}>
...
</div>



    </>
  );
};

    export default Navigation;