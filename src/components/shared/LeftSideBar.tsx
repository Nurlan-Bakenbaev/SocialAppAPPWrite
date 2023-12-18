import { useUserContext } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

const LeftSideBar = () => {
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate("/sign-in");
    }
  }, [isSuccess]);
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
        <div className="flex gap-2">
          <Button
            onClick={() => signOut()}
            variant="ghost"
            className=" hover:text-blue-500 transition 
            hover:scale-105 ease-in text-[20px]"
          >
            <CiLogout />
          </Button>
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
        </div>
      </div>
    </nav>
  );
};

export default LeftSideBar;
