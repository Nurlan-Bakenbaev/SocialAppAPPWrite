import { Models } from "appwrite";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  return (
    <div className="flex justify-between items-baseline z-20">
      <div className="flex gap-2 mt-5">
        <img
          src="/assets/icons/liked.svg"
          className="cursor-pointer"
          width={20}
          height={20}
          alt="liked"
        />
        <p className="small-medium lg:base-medium">0</p>
      </div>
      <div className="flex gap-2">
        <img
          src="/assets/icons/saved.svg"
          className="cursor-pointer"
          width={20}
          height={20}
          alt="saved"
        />
      
      </div>
    </div>
  );
};

export default PostStats;
