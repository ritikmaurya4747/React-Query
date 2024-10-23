import axios from 'axios';
import { useQueries } from 'react-query';

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};


export const DynamicParallelPage = ({ heroIds }) => {
    const queryResults = useQueries(
        heroIds.map((id) => {
            return {
                queryKey: ['super-hero', id],
                queryFn: () => fetchSuperHero(id),
            };
        })
    );

    return (
        <div>
            <h2>Dynamic Parallel Page</h2>
            {queryResults.map((result, index) => {
                if (result.isLoading) {
                    return <p key={index}>Loading...</p>;
                }

                if (result.isError) {
                    return <p key={index}>Error: {result.error.message}</p>;
                }

                return (
                    <div key={index}>
                        <h3>{result.data?.data.name}</h3>
                        <p>Alter Ego: {result.data?.data.alterEgo}</p>
                    </div>
                );
            })}
        </div>
    );
};
