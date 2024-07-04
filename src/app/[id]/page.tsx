import { Pokemon } from "@/types/poketmon.type";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const getTargetPokemon = async (id: string): Promise<Pokemon> => {
  const { data: pokemon } = await axios.get(
    `https://pokedex-rouge-theta-13.vercel.app/${id}`
  );
  return pokemon;
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id: paramsId } = params;

  const pokemon = await getTargetPokemon(paramsId);
  const { id, korean_name } = pokemon;

  return {
    title: `${id}.${korean_name}`,
    description: `${korean_name} 정보`,
  };
};

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id: paramsId } = params;

  const pokemon = await getTargetPokemon(paramsId);

  const { id, korean_name, height, weight, sprites, types, abilities, moves } =
    pokemon;

  return (
    <div>
      <div className="flex flex-col items-center text-2xl p-2 mb-6 shadow-list-container rounded-md">
        <p>{`no.00${id}`}</p>
        <p>{korean_name}</p>
      </div>
      <div>
        <div className="flex justify-center gap-[6rem]">
          <div>
            <Image
              className="w-[200px] h-[200px] bg-black flex justify-center items-center"
              src={sprites.front_default}
              width={100}
              height={100}
              alt="name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-2xl">{korean_name}</p>
            <div>
              <p>키 : {height}</p>
              <p>무게 : {weight}</p>
            </div>
            <div>
              <ul className="flex gap-2 items-center">
                타입 :
                {types.map((type, index) => (
                  <li
                    key={index}
                    className="rounded-md p-[0.25rem] bg-[#ED1D24]"
                  >
                    {type.type.korean_name}
                  </li>
                ))}
              </ul>
              <ul className="flex gap-2 items-center">
                특성 :
                {abilities.map((ability, index) => (
                  <li
                    key={index}
                    className="rounded-md p-[0.25rem] bg-[#1E65B1]"
                  >
                    {ability.ability.korean_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold mb-4">스킬</p>
        <ul className="w-[80%] flex flex-wrap gap-4 justify-center">
          {moves.map((move, index) => (
            <li key={index}>{move.move.korean_name}</li>
          ))}
        </ul>
      </div>
      <Link href={"/"}>
        <button className="bg-slate-700 rounded-md m-2 p-1">뒤로가기</button>
      </Link>
    </div>
  );
}
