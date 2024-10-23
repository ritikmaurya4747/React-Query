import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes");
};
function RQSuperHeroesPage() {
  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };
  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };

  // const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
  //   "super-heroe",
  //   fetchSuperHeros,
  //   {
  //     enabled: false,
  //     onSuccess,
  //     onError,
  //     select: (data) => {
  //       const superHeroNames = data.data.map((hero) => hero.name);
  //       return superHeroNames;
  //     },
  //   }
  // );

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(
      onSuccess,
      onError
      // same as above, but this is coming from the custom usequeryHook
    );

  if ((isLoading, isFetching)) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Error fetching data: {error.message}</h2>;
  }
  return (
    <>
      {/* // ye wala code use karne ke liye uper select wala funtion remove or comment karne ke baad hi use kar sakate hain */}
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
          {data?.data.map((hero) => {
            return (
              <div key={hero.id}>
                <Link to={`/rq-super-heroes/${hero.id}`}>
                  <p className="text-center text-red-500 text-2xl font-bold underline">
                    {hero.name}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}

      {/* ye wala select wale funtion ke liye code hain to fetch data same as up  */}
      {/* <div>
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
          {data &&
            data.map((heroName) => {
              return (
                <div
                  key={heroName}
                  className="text-center text-red-500 text-2xl font-bold"
                >
                  {heroName}
                </div>
              );
            })}
        </div>
      </div> */}
    </>
  );
}

export default RQSuperHeroesPage;
