import { Models } from "appwrite";
import React from "react";
import Loader from "./Loader";
import GridPostLists from "./GridPostLists";

type SearcResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
};
const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearcResultsProps) => {
  if (isSearchFetching) {
    return <Loader />;
  }
  if (searchedPosts && searchedPosts?.documents.length > 0)
    return <GridPostLists posts={searchedPosts?.documents} />;
  return (
    <p className="text-light-4 mt-10 text-center w-full ">
      No matching results !
    </p>
  );
};

export default SearchResults;
