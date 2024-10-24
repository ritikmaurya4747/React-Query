import React from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

const pageSize = 2;

const fetchColors = ({ pageParam = 1 }) => {
  const start = (pageParam - 1) * pageSize;
  const end = start + pageSize;
  return axios.get(`http://localhost:4000/colors?_start=${start}&_end=${end}`);
};
export const InfiniteQueriesPage = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.pages.map((group, i) => {
          return (
            <p
              className="text-center text-red-500 text-2xl font-bold pt-5"
              key={i}
            >
              {group.data.map((color) => (
                <h2 key={color.id}>
                  {color.id} {color.label}
                </h2>
              ))}
            </p>
          );
        })}
      </div>
      <div className="flex justify-center gap-10 items-center my-6">
       
        <button
          className={`px-3 py-2 text-white font-bold mb-5 ${
            hasNextPage ? "bg-blue-600" : "bg-red-100 text-black"
          } rounded-md flex justify-center items-center`}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
        >
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};
