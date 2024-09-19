import { useQuery } from "@tanstack/react-query";

const useScan = () => {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['scan'],
    queryFn: async () => {
      const response = await fetch('https://api.example.com/scan');
      return response.json();
    },
  });

  return {data, isLoading, isError};
};
export default useScan;