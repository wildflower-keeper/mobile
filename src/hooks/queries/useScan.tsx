import { useQuery } from "@tanstack/react-query";

const {data, isLoading , isError}  = useQuery({
  queryKey: ['scan'],
  queryFn: async () => {
    const response = await fetch('https://api.example.com/scan');
    return response.json();
  },
});