import CharacterCard from "../CharacterCard";

function CharacterGrid({characters}) {
    return (
        <>
            {characters.map((character) => (<CharacterCard key={character.id} {...character} />))}
        </>
    )
}

export default CharacterGrid;