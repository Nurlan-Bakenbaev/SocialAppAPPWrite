import { bottombarLinks } from "@/constans";
import { INavLink } from "@/types";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
const BottomBar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      <ul className="flex flex-row w-full justify-center gap-5 ">
        {bottombarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <Link
              to={link.route}
              key={link.label}
              className={`bottombar-link group transition p-1 rounded-md duration-500 flex flex-col items-center px-2 ${
                isActive && "bg-primary-500"
              }`}
            >
              <img
                src={link.imgURL}
                alt={link.label}
                width={30}
                className={`group-hover:invert-white ${
                  isActive && "invert-white"
                }`}
              />
              <span className="text-sm text-light-2">{link.label}</span>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default BottomBar;
