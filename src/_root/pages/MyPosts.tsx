import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { getCurrentUserPosts } from "@/lib/appwrite/api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyPosts = () => {
  const { user } = useUserContext();
  const [posts, setPosts] = useState();
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
  return (
    <div className=" flex  flex-col mt-12 mx-5 md:mx-10">
      <h2 className="h3-bold md:h2-bold w-full py-2"> My Posts</h2>
      <div className="px-2 mb-5">
        <ul className="grid-container ">
          {posts?.map((post) => (
            <li className=" relative" key={post.$id}>
              <Link className="grid-post_link " to={`/posts/${post.$id}`}>
                <img
                  className="h-full w-full object-cover"
                  src={post.imageUrl}
                  alt="post-image"
                />
              </Link>
              <Link
                to={`/posts/${post.$id}`}
                className="absolute top-0 bottom-0 w-full h-full rounded-[24px] transition duration-200 
                ease-in-out hover:bg-[#b34db3] opacity-40  "
              />
              {/* POST EDIT BUTTON */}
              <Link
                className={`absolute top-4 right-4 ${
                  user.id !== post.creator.$id && "marker:hidden"
                }`}
                to={`/update-post/${post.$id}`}
              >
                <img
                  width={30}
                  height={30}
                  src="/assets/icons/edit.svg"
                  alt="edit"
                />
              </Link>
              <div className="grid-post_user">
                {post.creator && (
                  <div className="flex items-center justify-start gap-2  flex-1">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={post.creator?.imageUrl}
                      alt="creator"
                    />
                    <p className="line-clamp-1">{post.creator?.name}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyPosts;
