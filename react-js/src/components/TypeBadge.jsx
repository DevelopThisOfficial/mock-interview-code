export default function TypeBadge({ type }) {
    return (
        <span className={"m-1 pkm-type " + type.type.name}>{type.type.name}</span>
    )
}
