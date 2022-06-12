import axios from "axios";

export default {
    async randomPokemon() {
        try {
            const randomNum = Math.floor(Math.random() * (898 - 1) + 1);
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);
            if (response.status === 200) {
                return response.data
            } else {
                return {
                    status: response.status,
                    error: "Something went wrong!"
                }
            }
        } catch (err) {
            console.error(err);
            return { error: err };
        }
    },
    async getCall(url) {
        try {
            const response = await axios.get(url);

            if (response.status === 200) {
                return response.data
            } else {
                return {
                    status: response.status,
                    error: "Something went wrong!"
                }
            }
        } catch (err) {
            console.error(err);
            return { error: err };
        }
    },
    async getPokeByName(name) {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            return response.data;
        } catch (err) {
            console.error(err);
            return { error: err };
        }
    },
    async getSpriteByName(name) {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            return response.data.sprites.front_default;
        } catch (err) {
            console.error(err);
            return { error: err };
        }
    },
    async getEvoChain(url) {
        try {
            const response = await axios.get(url);
            let currentVal = response.data.chain;
            let data = [];

            while (true) {
                if (currentVal.evolves_to.length === 0) {
                    const sprite = await this.getSpriteByName(currentVal.species.name);
                    data.push({
                        name: currentVal.species.name,
                        sprite,
                        details: {}
                    })
                    return data;
                } else {
                    const sprite = await this.getSpriteByName(currentVal.species.name);
                    data.push({
                        name: currentVal.species.name,
                        sprite,
                        details: currentVal.evolves_to[0].evolution_details[0]
                    })
                    currentVal = currentVal.evolves_to[0];
                }
            }
        } catch (err) {
            console.error(err);
            return { error: err };
        }
    }
}