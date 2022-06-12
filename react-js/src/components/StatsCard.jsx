import Utils from "../utils/functions";

export default function StatsCard({ stats }) {
    return (
        <div className="card p-1 col-3">
            <h5 className="text-center">Stats</h5>
            {stats.map((stat, index) => (
                <p key={index} ><b>{Utils.capitlizeFirstLetter(stat.stat.name)}</b>: {stat.base_stat}</p>
            ))}
        </div>
    )
}
