import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { CiLogout } from "react-icons/ci";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  useEffect(() => {
    if (isSuccess) {
      navigate("/sign-in");
    }
  }, [isSuccess]);
  return (
    <section className="topbar">
      <div className=" flex-between py-4 px-5">
        <Link to={"/"} className="flex gap-3 items-center">
          <img
            className="spin-around"
            src="/ContactUS.png"
            alt="logo"
            width={45}
          />
          <h5 className="uppercase text-sm md:text-xl">ContactUS</h5>
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
          <Link className="flex-center" to={`/profile/${user.id}`}>
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
    </section>
  );
};

export default Topbar;
