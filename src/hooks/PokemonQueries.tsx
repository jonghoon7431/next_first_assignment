import { Pokemon } from "@/types/poketmon.type";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const usePokemonQuery = () => {
  const { data: pokemons, isPending: pokemonsIsPending } = useQuery<
    Pokemon[],
    AxiosError,
    Pokemon[]
  >({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/poketmon");
      return response.data;
    },
  });
  return { pokemons, pokemonsIsPending };
};

export default usePokemonQuery;
