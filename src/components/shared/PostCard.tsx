import { useUserContext } from "@/context/AuthContext";
import { timeAgo } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
  post: Models.Document;
};
const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  if (!post.creator) return;
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex  items-center gap-3">
          <Link
            className="w-[40px] h-[40px]"
            to={`/profile/${post.creator.$id}`}
          >
            <img
              src={post?.creator?.imageUrl}
              alt="User-Post_image"
              className="rounded-full w-full h-full object-cover"
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className=" flex  gap-3  text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
              <p className="subtle-semibold lg:small-regular">
                {timeAgo(post.$createdAt)}
              </p>
            </div>
          </div>
        </div>

        <Link
          className={`${user.id !== post.creator.$id && "marker:hidden"}`}
          to={`/update-post/${post.$id}`}
        >
          <img width={20} height={20} src="/assets/icons/edit.svg" alt="edit" />
        </Link>
      </div>
      <Link to={`/posts/${post?.$id}`}>
        <div
          className="flex flex-col flex-1 w-full 
        small-medium lg:base-regular"
        >
          <p className="pt-2">{post?.caption}</p>
          <ul className="flex gap-1 mt-1">
            {post?.tags.map((tag: string) => (
              <li className=" text-light-3" key={tag}>
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={post.imageUrl || "/public/assets/icons/profile-placeholder.svg"}
          alt="postImage"
        />
      </Link>
      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
