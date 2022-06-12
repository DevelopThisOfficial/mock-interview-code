import { FaArrowAltCircleRight } from "react-icons/fa";
import Utils from "../utils/functions";
import API from "../utils/api";

export default function EvoPoke({ poke, setPokemon, setLoading }) {

    const handleClick = async (e, name) => {
        e.preventDefault();
        setLoading(true);
        const data = await API.getPokeByName(name);
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
            <div className="col-3" style={{ cursor: "pointer" }} onClick={(e) => handleClick(e, poke.name)}>
                <img src={poke.sprite} alt={poke.name} />
                <h6>{Utils.capitlizeFirstLetter(poke.name)}</h6>
            </div>
            {(poke.details.trigger && <FaArrowAltCircleRight className="col-1" />)}
        </>
    )
}
