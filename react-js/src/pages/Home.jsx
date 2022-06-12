import { useState } from "react";
import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";
import API from "../utils/api";

export default function Home() {

    const [loading, setLoading] = useState();
    const [pokemon, setPokemon] = useState({});

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = await API.randomPokemon();
        const desc = await API.getCall(data.species.url);
        const evoChain = await API.getEvoChain(desc.evolution_chain.url);
        setPokemon({
            ...data,
            description: desc.flavor_text_entries.filter(text => text.language.name === "en")[0].flavor_text.replace("\n", " ").replace("\f", ""),
            evolution: evoChain
        });
        setLoading(false);
    }

    return (
        <>
            <div className="mx-auto w-75 p-3">
                <div className="d-flex">
                    <h2>Random Pokemon Generator</h2>
                    <button className="btn btn-primary btn-sm w-20 ms-auto" onClick={(e) => handleClick(e)}>
                        Random Pokemon
                    </button>
                </div>
            </div>
            <hr />
            <br />
            {loading ? <Loading /> : <PokemonCard pokemon={pokemon} setLoading={setLoading} setPokemon={setPokemon} />}
        </>
    )
}
