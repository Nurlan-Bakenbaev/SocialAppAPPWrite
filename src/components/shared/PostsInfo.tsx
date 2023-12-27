import { timeAgo } from "@/lib/utils";
import { Models } from "appwrite";

import { Link } from "react-router-dom";
type Post = {
  posts: Models.Document;
};
const PostsInfo = ({ posts }: Post) => {
  console.log(posts);
  return (
    <div>
      <div className="flex flex-col w-full h-screen ">
        <div className="px-2 mb-5">
          <ul className="grid-container ">
            {posts.map((post) => (
              <li className=" relative" key={post.$id}>
                <div className="grid-post_link ">
                  <img
                    className="h-full w-full object-cover"
                    src={post.imageUrl}
                    alt="post-image"
                  />
                </div>
                <Link title="Click to read more"
                  to={`/posts/${post.$id}`}
                  className="absolute top-0 bottom-0 w-full h-full 
                  rounded-[24px] transition duration-200 
              ease-in-out hover:bg-black opacity-40  "
                />
                <div className="grid-post_user">
                  {post.creator && (
                    <div className="flex gap-2  justify-start ">
                      <img
                        className="w-12 h-12 object-cover rounded-full"
                        src={post.creator?.imageUrl}
                        alt="creator"
                      />
                      <div>
                        <p className="line-clamp-1">{post.creator?.name}</p>
                        <span className="text-xs text-slate-300">
                          {timeAgo(post.$createdAt)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostsInfo;
