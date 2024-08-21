import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  const icons = [
    {
      title: "Github",
      href: "https://github.com/DevanshTyagi-Codes",
      icon: <FaGithub />,
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/devansh-tyagi-aa6745260",
      icon: <FaLinkedin />,
    },
    {
      title: "Twitter",
      href: "https://x.com/tyagidevansh614",
      icon: <FaSquareXTwitter />,
    },
  ];
  return (
    <footer className="bg-neutral-100 dark:bg-slate-800 dark:text-white w-full min-h-[20vh] shadow-sm p-1 sm:p-4 flex justify-evenly gap-3 sm:grid sm:grid-cols-3">
      <div className="flex items-center justify-center gap-1">
        <img className="w-9 h-9 rounded-lg" src="/logo.png" alt="" />
        <span className="hidden sm:block font-semibold text-md text-nowrap">
          MegaMart.
        </span>
      </div>
      <div className="flex sm:flex-row flex-col gap-3 sm:gap-2 justify-center items-center">
        {icons.map((icon) => (
          <div key={icon.title} className="flex gap-1 items-center">
            <span className="text-3xl">{icon.icon}</span>
            <a href={icon.href}>
              <span>{icon.title}</span>
            </a>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <span className="font-semibold">© Devansh Tyagi</span>
      </div>
    </footer>
  );
};

export default Footer;
