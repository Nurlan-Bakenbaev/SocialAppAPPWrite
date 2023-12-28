import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { timeAgo } from "@/lib/utils";
import React from "react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { user } = useUserContext();
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");

  const handleDelete = () => {};
  return (
    <div className="post_details-container">
      {isPending ? (
        <div className="flex justify-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                className="flex items-center gap-3"
                to={`/profile/${post?.creator.$id}`}
              >
                <img
                  src={post?.creator?.imageUrl}
                  alt="User-Post_image"
                  className="rounded-full w-8 h-8 object-cover lg:w-12 lg:h-12"
                />
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className=" flex  gap-3  text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                    <p className="subtle-semibold lg:small-regular">
                      {timeAgo(post?.$createdAt)}
                    </p>
                  </div>
                </div>
              </Link>
              <div className=" flex-center gap-4">
                <Link
                  className={` ${user.id === post?.creator.$id && "hidden"}`}
                  to={`/update-post/${post?.$id}`}
                >
                  <img
                    width={24}
                    height={24}
                    src="/assets/icons/edit.svg"
                    alt="edit"
                  />
                </Link>
                <Button
                  variant="ghost"
                  className={`ghost_details-delete_btn ${
                    user.id === post?.creator.$id && "hidden"
                  }`}
                  onClick={handleDelete}
                >
                  <img
                    width={24}
                    height={24}
                    src="/assets/icons/delete.svg"
                    alt="Delete"
                  />
                </Button>
              </div>
            </div>

            <hr className=" border w-full border-dark-4" />
            <div className="small-medium lg:base-medium">
              <p>{post.caption}</p>
              <ul className="flex gap-1 mt-1">
                {post.tags.map((tag: string) => (
                  <li className=" text-light-3" key={tag}>
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
