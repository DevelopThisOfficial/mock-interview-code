import EvoPoke from "./EvoPoke";

export default function EvoChain({ evolution, setPokemon, setLoading }) {
    return (
        <>
            {(evolution.length > 1 && (
                <div className="d-flex justify-content-center align-items-center text-center row">
                    <EvoPoke poke={evolution[0]} setPokemon={setPokemon} setLoading={setLoading} />
                    <EvoPoke poke={evolution[1]} setPokemon={setPokemon} setLoading={setLoading} />
                    {(evolution.length > 2 && (
                        <EvoPoke poke={evolution[2]} setPokemon={setPokemon} setLoading={setLoading} />
                    ))}
                </div>
            ))}
        </>
    )
}
