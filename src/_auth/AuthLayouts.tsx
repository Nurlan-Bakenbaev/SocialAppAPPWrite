import { Outlet, Navigate } from "react-router-dom";
import "../globals.css";
const AuthLayouts = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section
            className="flex my-auto flex-1 justify-center 
        items-center flex-col  "
          >
            <Outlet />
          </section>
          <img
            className=" hidden md:block h-screen w-1/2 
            object-cover bg-no-repeat"
            src="https://images.pexels.com/photos/3816395/pexels-photo-3816395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="hero-image"
          />
        </>
      )}
    </>
  );
};

export default AuthLayouts;
