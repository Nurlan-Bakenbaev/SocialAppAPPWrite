import { getAllUsers } from "@/lib/appwrite/api";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState();
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
  return (
    <div className=" px-5">
      <h1>All users</h1>
      <div className=" flex flex-col gap-3  ">
        {users?.map((user) => (
          <div
            key={user.$id}
            className="bg-black px-2 rounded-md flex flex-1 gap-2"
          >
            <img
              width={24}
              height={24}
              className="rounded-full"
              src={user.imageUrl}
              alt={user.name}
            />
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
