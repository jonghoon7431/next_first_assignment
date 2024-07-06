import { Pokemon, Species } from "@/types/poketmon.type";
import axios from "axios";
import { NextResponse } from "next/server";

const TOTAL_POKEMON: number = 151;
const PAGE_PER_ITEM: number = 36;

export const GET = async (request: Request) => {
  try {
    const url: URL = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1") as number;
    const offset = ((page - 1) * PAGE_PER_ITEM) as number;
    const limit = Math.min(PAGE_PER_ITEM, TOTAL_POKEMON - offset) as number;

    const allPokemonPromises = [...Array(limit)].map((_, index) => {
      const id = (offset + index + 1) as number;
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
