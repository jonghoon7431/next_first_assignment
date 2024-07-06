import { Pokemon } from "@/types/poketmon.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface Props {
  page: number;
}

const PAGE_PER_ITEM: number = 36;

export const usePokemonQuery = ({ page }: Props) => {
  const {
    data: pokemons,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: pokemonsIsPending,
  } = useInfiniteQuery<Pokemon[], AxiosError, Pokemon[]>({
    queryKey: ["pokemons", page],
    initialPageParam: page,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await axios.get<Pokemon[]>(
          `/api/poketmon?page=${pageParam}`
        );
        return response.data;
      } catch (error) {
        throw new Error("포켓몬 정보 불러오기 실패");
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = (allPages.length + 1) as number;
      if (lastPage.length < PAGE_PER_ITEM) {
        return undefined;
      }
      return nextPage;
    },
    select: ({ pages }) => pages.flat(),
  });

  return {
    pokemons,
    pokemonsIsPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};

export default usePokemonQuery;
