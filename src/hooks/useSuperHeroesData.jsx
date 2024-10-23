import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes");
};
export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroe", fetchSuperHeros, {
    enabled: false,
    onSuccess,
    onError,
    select: (data) => {
      const superHeroNames = data.data.map((hero) => hero.name);
      return superHeroNames;
    },
  });
};
