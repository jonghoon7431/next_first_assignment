import { Pokemon, Species } from "@/types/poketmon.type";
import axios from "axios";
import { NextResponse } from "next/server";

const TOTAL_POKEMON: number = 151;
const PAGE_PER_ITEM: number = 36;

export const GET = async (request: Request) => {
  try {
    const url: URL = new URL(request.url);
    const page: number = parseInt(url.searchParams.get("page") || "1");
    const offset: number = (page - 1) * PAGE_PER_ITEM;
    const limit: number = Math.min(PAGE_PER_ITEM, TOTAL_POKEMON - offset);

    const allPokemonPromises = [...Array(limit)].map((_, index) => {
      const id: number = offset + index + 1;
      return Promise.all([
        axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get<Species>(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
      ]);
    });

    const allPokemonResponses = await Promise.all(allPokemonPromises);

    const allPokemonData = allPokemonResponses.map(
      ([response, speciesResponse], index) => {
        const koreanName = speciesResponse.data.names.find(
          (name) => name.language.name === "ko"
        );
        return { ...response.data, korean_name: koreanName?.name || null };
      }
    );

    return NextResponse.json(allPokemonData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
