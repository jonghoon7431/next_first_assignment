import { Pokemon, Species, UrlNames } from "@/types/poketmon.type";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const response = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const speciesResponse = await axios.get<Species>(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );

    const koreanName = speciesResponse.data.names?.find(
      (name) => name.language.name === "ko"
    );

    const typesWithKoreanNames = await Promise.all(
      response.data.types.map(async (type) => {
        const typeResponse = await axios.get<UrlNames>(type.type.url);
        const koreanTypeName =
          typeResponse.data.names?.find((name) => name.language.name === "ko")
            ?.name || type.type.name;
        return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
      })
    );

    const abilitiesWithKoreanNames = await Promise.all(
      response.data.abilities.map(async (ability) => {
        const abilityResponse = await axios.get<UrlNames>(ability.ability.url);
        const koreanAbilityName =
          abilityResponse.data.names?.find(
            (name: any) => name.language.name === "ko"
          )?.name || ability.ability.name;
        return {
          ...ability,
          ability: { ...ability.ability, korean_name: koreanAbilityName },
        };
      })
    );

    const movesWithKoreanNames = await Promise.all(
      response.data.moves.map(async (move) => {
        const moveResponse = await axios.get<UrlNames>(move.move.url);
        const koreanMoveName =
          moveResponse.data.names?.find((name) => name.language.name === "ko")
            ?.name || move.move.name;
        return { ...move, move: { ...move.move, korean_name: koreanMoveName } };
      })
    );

    const pokemonData = {
      ...response.data,
      korean_name: koreanName?.name || response.data.name,
      types: typesWithKoreanNames,
      abilities: abilitiesWithKoreanNames,
      moves: movesWithKoreanNames,
    };

    return NextResponse.json(pokemonData);
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
