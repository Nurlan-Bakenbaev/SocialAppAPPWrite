import Loader from "@/components/shared/Loader";
import PostsInfo from "@/components/shared/PostsInfo";
import { useUserContext } from "@/context/AuthContext";
import { getCurrentUserPosts } from "@/lib/appwrite/api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyPosts = () => {
  const { user } = useUserContext();
  const [posts, setPosts] = useState();
  console.log;
  useEffect(() => {
    const getUserPosts = async () => {
      const currentUserPosts = await getCurrentUserPosts();
      setPosts(currentUserPosts?.documents);
    };
    getUserPosts();
  }, []);
  if (!posts)
    return (
      <div className="w-full h-full flex justify-center">
        <Loader />
      </div>
    );
  if (posts?.length === 0)
    return (
      <div className="flex w-full h-screen flex-col items-center justify-center">
        <img
          src="/public/assets/post_icons/empty-folder.png"
          width={130}
          height={130}
          alt="No-posts"
        />
        <h3 className="text-3xl py-3">You don't have posts.</h3>
      </div>
    );
  return (
    <div className="explore-container  mb-10">
      <div className="flex flex-col w-full h-screen   ">
        <h2 className="h3-bold md:h2-bold w-full py-2"> My Posts</h2>
        <div className="px-2 mb-5">
          <PostsInfo posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
