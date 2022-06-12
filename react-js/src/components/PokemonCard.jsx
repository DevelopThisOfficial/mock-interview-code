import Utils from "../utils/functions";
import StatsCard from "./StatsCard";
import TypeBadge from "./TypeBadge";
import EvoChain from "./EvoChain";

export default function PokemonCard({ pokemon, setPokemon, setLoading }) {

    if (!pokemon.name) {
        return <></>
    }

    console.log(pokemon);

    return (
        <div className="mx-auto w-100 card p-5">
            <div className="d-flex align-items-center">
                <div className="text-center">
                    <h1>{Utils.capitlizeFirstLetter(pokemon.name)}</h1>
                    <div className="d-flex">
                        {pokemon.types.map((type, index) => (
                            <TypeBadge type={type} key={index} />
                        ))}
                    </div>
                </div>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-25 d-inline ms-auto" />
                <img src={pokemon.sprites.back_default} alt={pokemon.name} className="w-25 d-inline" />
            </div>
            <div className="row mt-5">
                <StatsCard stats={pokemon.stats} />
                <div className="col-1"></div>
                <div className="col-8">
                    <p style={{ fontSize: "20px" }} className="mb-5">
                        {pokemon.description}
                    </p>
                    <EvoChain evolution={pokemon.evolution} setPokemon={setPokemon} setLoading={setLoading} />
                </div>
            </div>
        </div>
    )
}
