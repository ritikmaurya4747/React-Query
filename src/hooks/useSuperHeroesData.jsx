import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHeros = () => {
  // return axios.get("http://localhost:4000/superheroes");
  return request({ url: '/superheroes' })};
const addSuperHero = (hero) => {
  // return axios.post("http://localhost:4000/superheroes", hero);
  return request({url:"/superheroes",method:'POST',data:hero});
};
export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroe", fetchSuperHeros, {
    enabled: true,
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: () => {
    //   queryClient.invalidateQueries("super-heroe")
    //   queryClient.setQueryData("super-heroe",(oldQueryData) => {
    //     return{
    //       ...oldQueryData,
    //       data:[...oldQueryData.data,data.data],
    //     }
    //   })
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroe");
      const previosHeroData = queryClient.getQueryData("super-heroe");
      queryClient.setQueryData("super-heroe", (oldQueryData) => {
        if(!oldQueryData?.data){
          return {
            ...oldQueryData,
            data: [
              ...oldQueryData,
              { id: oldQueryData?.data?.length + 1, ...newHero },
            ],
          };
        }
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData.data.length + 1, ...newHero },
          ],
        };
      });
    
      
      return {
        previosHeroData,
      }
    },
    onError: (_error,_hero,context) => {
      queryClient.setQueryData("super-heroe", context.previosHeroData);
    },
    onSettleda: () => {
      queryClient.invalidateQueries("super-heroe");
    },
  });
};
