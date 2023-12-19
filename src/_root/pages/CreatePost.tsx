import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="w-full  flex-start gap-3 justify-start ">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            className=""
            alt="add-post"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Posts</h2>
       
        </div>
        <PostForm/>
      </div>
    </div>
  );
};

export default CreatePost;
