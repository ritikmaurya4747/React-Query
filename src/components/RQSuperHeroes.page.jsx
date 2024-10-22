import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

function RQSuperHeroesPage() {
  const fetchSuperHeros = () => {
    return axios.get("http://localhost:4000/superheroesa");
  };

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching",data);
}
  const onError = (error) => {
    console.log("Perform side effect after encountering error",error);
}

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroe",
    fetchSuperHeros,
    { 
        enabled: false,
        onSuccess,
        onError,
     }
  );

  console.log({ isLoading, isFetching });

  if ((isLoading, isFetching)) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Error fetching data: {error.message}</h2>;
  }
  return (
    <>
      <div className="">
        <h2 className="text-center mt-10 py-3 text-3xl font-bold">
          RQ Super Heroes Page
        </h2>
        <div className="flex flex-col items-center my-6">
          <button
            className="px-3 py-2 text-white font-bold mb-5 bg-blue-600 rounded-md flex justify-center items-center"
            onClick={refetch}
          >
            Fetch heroes
          </button>
          {data?.data.map((hero) => (
            <p
              key={hero.name}
              className="text-center text-red-500 text-2xl font-bold"
            >
              {hero.name}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default RQSuperHeroesPage;
