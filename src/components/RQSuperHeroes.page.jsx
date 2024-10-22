import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

function RQSuperHeroesPage() {
    
  const fetchSuperHeros = () => {
    return axios.get("http://localhost:4000/superheroes");
  };

  const { isLoading, data } = useQuery("super-heroe", fetchSuperHeros);
  if (isLoading) {
    return <h2>Loading...</h2>;
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
