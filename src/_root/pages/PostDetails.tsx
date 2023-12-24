import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { timeAgo } from "@/lib/utils";
import React from "react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="post"
            className="post_details-img"
          />
          <div className="flex  items-center gap-3">
            <Link to={`/profile/${post?.creator.$id}`}>
              <img
                src={post?.creator?.imageUrl}
                alt="User-Post_image"
                className="rounded-full w-12 lg:h-12"
              />
            </Link>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
