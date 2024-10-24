import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const pageSize = 2;

const fetchColors = (pageNumber) => {
 
  const start = (pageNumber - 1) * pageSize;
  const end = start + pageSize;
  return axios.get(`http://localhost:4000/colors?_start=${start}&_end=${end}`);
};
export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { isLoading, isError, error, data } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
        keepPreviousData : true,
    }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <h2 className="text-center mt-10 py-3 text-3xl font-bold">
        PaginatedQueries Page
      </h2>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h2 className="text-center text-red-500 text-2xl font-bold ">
                {color.id} - {color.label}
              </h2>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-10 items-center my-6">
        <button
          className="px-3 py-2 text-white font-bold mb-5 bg-blue-600 rounded-md flex justify-center items-center"
          onClick={() => {
            console.log(`Prev page: ${pageNumber}`);
            setPageNumber((page) => page - 1)}}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>
        <button
          className="px-3 py-2 text-white font-bold mb-5 bg-blue-600 rounded-md flex justify-center items-center"
          onClick={() => {
            console.log(`Next page: ${pageNumber}`);
            setPageNumber((page) => page + 1)}}
          disabled={pageNumber === 4}
        >
          Next Page
        </button>
      </div>
    </>
  );
};