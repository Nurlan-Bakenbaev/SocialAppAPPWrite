import Loader from "@/components/shared/Loader";
import PostsInfo from "@/components/shared/PostsInfo";
import { getUserProfileById } from "@/lib/appwrite/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const path = useParams();
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async (userId: string) => {
      try {
        const userData = await getUserProfileById(userId);
        console.log(userData);
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile(path?.id);
  }, [path]);
  if (!user) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <h2
          className="h3-bold md:h2-bold 
          text-left w-full"
        >
          All the User Posts
        </h2>
        <h4 className=" text-[22px]  ">{`Username : ${user?.name}`}</h4>
        <div>
          <PostsInfo posts={user?.posts} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
