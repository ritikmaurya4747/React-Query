import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

function RQSuperHeroesPage() {
    
  const fetchSuperHeros = () => {
    return axios.get("http://localhost:4000/superheroesa");
  };

  const { isLoading, data, isError, error } = useQuery("super-heroe", fetchSuperHeros);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if(isError){
    return <h2>Error fetching data: {error.message}</h2>;
  }
  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {data?.data.map((hero) => {
        return <p key={hero.name}>{hero.name}</p>;
      })}
    </>
  );
}

export default RQSuperHeroesPage;
