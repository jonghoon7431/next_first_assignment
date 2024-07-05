import { Pokemon } from "@/types/poketmon.type";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface Props {
  page: number;
}

export const usePokemonQuery = ({ page }: Props) => {
  const { data: pokemons, isPending: pokemonsIsPending } = useQuery<
    Pokemon[],
    AxiosError,
    Pokemon[]
  >({
    queryKey: ["pokemons", page],
    queryFn: async () => {
      const response = await axios.get(`/api/poketmon?page=${page}`);

      return response.data;
    },
  });
  return { pokemons, pokemonsIsPending };
};

export default usePokemonQuery;
