import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import { timeAgo } from "@/lib/utils";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostLists = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li className=" relative" key={post.$id}>
          <div className="grid-post_link ">
            <img
              className="h-full w-full object-cover"
              src={post.imageUrl}
              alt="post-image"
            />
          </div>
          <Link
            to={`/posts/${post.$id}`}
            className="absolute top-0 bottom-0 w-full h-full rounded-[24px] transition duration-200 ease-in-out hover:bg-black opacity-40  "
          />

          <div className="grid-post_user">
            {showUser && post.creator && (
              <div className="flex items-center justify-start gap-2  flex-1">
                <img
                  className="h-8 w-8  object-cover rounded-full"
                  src={post.creator?.imageUrl}
                  alt="creator"
                />
                <div className="flex flex-col">
                  <p className="line-clamp-1">{post.creator?.name}</p>
                  <span className="test-sm text-slate-400">
                    {timeAgo(post.$createdAt)}
                  </span>
                </div>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user?.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostLists;
