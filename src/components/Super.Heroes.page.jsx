import axios from "axios";
import React, { useEffect, useState } from "react";

// ye normal tarike se data ko handle kar rahe hain
function SuperHeroespage() {
  const [isloading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:4000/superheroes")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);
  if (isloading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <h1 className="text-center p-5 text-4xl font-bold">Super Heroes Page</h1>
      {data.map((hero) => {
        return <div className="text-center text-red-300 text-2xl font-semibold" key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
}

export default SuperHeroespage;
