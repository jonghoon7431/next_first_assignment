"use client";

import usePokemonQuery from "@/hooks/PokemonQueries";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MainPagination from "./Pagination";

const PokemonList = () => {
  const TOTAL_POKEMON: number = 151;
  const ITEMS_PER_PAGE: number = 30;
  const totalPage: number = Math.ceil(TOTAL_POKEMON / ITEMS_PER_PAGE);

  const [page, setPage] = useState<number>(1);
  const { pokemons, pokemonsIsPending } = usePokemonQuery({ page });

  if (pokemonsIsPending || !pokemons) {
    return <div>loading . . .</div>;
  }

  return (
    <div>
      <h1 className="text-4xl mx-auto flex justify-center py-6 font-bold">
        포켓몬 도감
      </h1>
      <ul className="grid gap-4 grid-cols-6 grid-rows-6 content-center items-center p-6">
        {pokemons.map((pokemon) => {
          const { id, sprites, name, korean_name } = pokemon;
          return (
            <Link href={`${id}`} key={id}>
              <li className="flex flex-col items-center border border-gray-500 rounded-md cursor-pointer">
                <Image
                  src={sprites.front_default}
                  width={100}
                  height={100}
                  alt={name}
                />
                <p>
                  {id}.{korean_name}
                </p>
              </li>
            </Link>
          );
        })}
      </ul>
      <MainPagination totalPage={totalPage} page={page} setPage={setPage} />
    </div>
  );
};

export default PokemonList;
