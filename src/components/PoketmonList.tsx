"use client";

import usePokemonQuery from "@/hooks/PokemonQueries";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const PokemonList = () => {
  //TODO 디테일 페이지에서 돌아올 때, 무한스크롤 초기화 방법 찾기
  const {
    pokemons,
    pokemonsIsPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = usePokemonQuery({ page: 1 });

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (pokemonsIsPending || !pokemons) {
    return <div>loading . . .</div>;
  }

  return (
    <div>
      <h1 className="text-4xl mx-auto flex justify-center py-6 font-bold">
        포켓몬 도감
      </h1>
      <ul className="grid gap-4 grid-cols-6 grid-rows-6 content-center items-center p-6">
        {pokemons.map((pokemon, index) => {
          const { id, sprites, name, korean_name } = pokemon;
          const isLastItem = pokemons.length - 1 === index;
          return (
            <li
              ref={isLastItem ? ref : null}
              key={id}
              className="flex flex-col items-center border border-gray-500 rounded-md cursor-pointer"
            >
              <Link href={`${id}`}>
                <div>
                  <img
                    src={sprites.front_default}
                    width={100}
                    height={100}
                    alt={name}
                  />
                  <p>
                    {id}.{korean_name}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
        {isFetchingNextPage && <div>load more . . </div>}
      </ul>
    </div>
  );
};

export default PokemonList;
