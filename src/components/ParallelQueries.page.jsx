import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};
export const ParallelQueriesPage = () => {
  useQuery("super-heroes", fetchSuperHeroes);
  useQuery("friends", fetchFriends);


  // const { data: superHeroes } = useQuery("super-heroes", fetchSuperHeroes);
  // const { data: friends } = useQuery("friends", fetchFriends);

  
  return <div>ParallelQueries Page</div>;
};
