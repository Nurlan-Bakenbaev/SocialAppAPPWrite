import { useUserContext } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { CiLogout } from "react-icons/ci";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { sidebarLinks } from "@/constans";
import { INavLink } from "@/types";

const LeftSideBar = () => {
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (isSuccess) {
      navigate("/sign-in");
    }
  }, [isSuccess]);
  console.log(user);
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11 ">
        <Link to={"/"} className="flex gap-3 items-center">
          <img
            className="spin-around"
            src="public/ContactUS.png"
            alt="logo"
            width={40}
          />
          <h5 className="uppercase text-xl">ContactUS</h5>
        </Link>

        <ul className="flex flex-col gap-5 ">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group flex px-2 ${
                  isActive && "bg-primary-500"
                }`}
              >
                <img
                  src={link.imgURL}
                  alt={link.label}
                  className={`group-hover:invert-white ${
                    isActive && "invert-white"
                  }`}
                />
                <NavLink
                  className="flex gap-4 items-center p-4"
                  to={link.route}
                >
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col items-center ">
          <div className="flex-center gap-2">
            <Link className="flex-center gap-2" to={`/profile/${user.id}`}>
              <img
                src={
                  user.imageUrl ||
                  "https://images.pexels.com/photos/1573324/pexels-photo-1573324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt="user-logo"
                className="h-8 w-8 rounded-full"
              />
            </Link>
            <div>
              <p className="body-bold">{user.name}</p>
              <p className="text-light-3">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center w-full justify-end py-3 group hover:text-red ">
            <label htmlFor="logOut" className="text-md">
              Log Out
            </label>
            <Button
              id="logOut"
              onClick={() => signOut()}
              variant="ghost"
              className=" transition 
            hover:scale-105 ease-in text-[25px]"
            >
              <CiLogout />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LeftSideBar;
