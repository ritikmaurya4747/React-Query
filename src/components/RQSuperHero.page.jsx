import React from "react";
import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

function RQSuperHeroPage() {
  const { heroId } = useParams();
  const { isLoading, data, isError, error } = useSuperHeroData(heroId);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Error fetching data: {error.message}</h2>;
  }
  return (
    <>
      <h1 className="text-center mt-10 py-3 text-3xl font-bold">
        Super Hero details
      </h1>
      <p className="text-center text-green-500 text-2xl font-bold ">
        {data.data.name} --- {data.data.alterEgo}
      </p>
    </>
  );
}

export default RQSuperHeroPage;
