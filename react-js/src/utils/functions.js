export default {
    capitlizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    filterStats(stat) {
        switch (stat.stat.name) {
            case "attack":
                return {
                    name: "attack",
                    value: stat.base_stat
                };
            case "defense":
                return {
                    name: "defense",
                    value: stat.base_stat
                };
            case "special-attack":
                return {
                    name: "special-attack",
                    value: stat.base_stat
                };
            case "special-defense":
                return {
                    name: "special-defense",
                    value: stat.base_stat
                };
            case "speed":
                return {
                    name: "speed",
                    value: stat.base_stat
                };
            default:
                return {
                    name: "hp",
                    value: stat.base_stat
                };
        }
    }
}