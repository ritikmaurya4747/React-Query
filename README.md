# npm install json-server --save-dev (apna server json file banene ke liye jo locally store hain)


# const { isLoading, data, isError, error, isFetching } = useQuery(
    "super-heroe",
    fetchSuperHeros,
    {
        cacheTime : 5000,
        staleTime : 0,
        refetchOnMount: true, 
        refetchOnWindowFocus : true,
        refetchInterval : 2000,
        refetchIntervalInBackground : true,
    }
  );  # ye bas demo code tha ki ye option work kaise karte hain chahe to use kar sakte hain