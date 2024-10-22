import axios from 'axios';
import React, { useEffect, useState } from 'react'

function SuperHeroespage() {
    const [isloading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/superheroes').then((res) => {
            setData(res.data);
            setIsLoading(false);
        })
    },[])
    if(isloading){
        return <h1>Loading...</h1>
    }
    
  return (
    <>
        <h1>Super Heroes Page</h1>
        {data.map((hero) => {
            return <div  key={hero.name}>
                {hero.name}
            </div>
        })}
    </>
  )
}

export default  SuperHeroespage
