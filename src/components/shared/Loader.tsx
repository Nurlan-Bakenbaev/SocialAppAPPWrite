const Loader = () => {
  return (
    <div className="flex items-center flex-row gap-2 justify-center">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-8 md:h-15 w-8 md:w-15"></div>
      <p className="py-2 text-light-2">Loading...</p>
    </div>
  );
};

export default Loader;
