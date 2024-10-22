import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

function RQSuperHeroesPage() {
  const fetchSuperHeros = () => {
    return axios.get("http://localhost:4000/superheroes");
  };

  const { isLoading, data, isError, error, isFetching } = useQuery(
    "super-heroe",
    fetchSuperHeros,
    {
        cacheTime : 5000
    }
  );

  console.log({isLoading,isFetching});
  

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Error fetching data: {error.message}</h2>;
  }
  return (
    <>
      <div className="">
      <h2 className="text-center p-5 text-3xl font-bold">RQ Super Heroes Page</h2>
      {data?.data.map((hero) => {
        return (
          <p key={hero.name} className="text-center text-red-300 text-2xl font-semibold">
            {hero.name}
          </p>
        );
      })}
      </div>
    </>
  );
}

export default RQSuperHeroesPage;
