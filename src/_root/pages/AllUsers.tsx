import Loader from "@/components/shared/Loader";
import { getAllUsers } from "@/lib/appwrite/api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState();
  const [isShowPosts, isSetShowPosts] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();

        const userDocuments = response?.documents || [];
        console.log(userDocuments);
        setUsers(userDocuments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);
  if (!users) {
    return (
      <div className="w-full h-full flex justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className=" w-full mt-12 px-8">
      <h2 className="h4-bold md:h2-bold w-full pb-5"> All Users</h2>

      <div className=" flex flex-col justify-center md:flex-row gap-3  ">
        {users?.map((user) => (
          <div key={user.$id}>
            <Link
              to={`/profile/${user.$id}`}
              className="bg-slate-700 max-w-sm transition hover:scale-110 duration-300 ease-in-out px-2 py-3 items-center rounded-md flex flex-1 gap-2"
            >
              <img
                width={30}
                height={3}
                className="rounded-full"
                src={user.imageUrl}
                alt={user.name}
              />
              <p>{user.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
