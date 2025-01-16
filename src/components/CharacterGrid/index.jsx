import CharacterCard from "../CharacterCard";
import {Flex} from "antd";

function CharacterGrid({characters}) {
    return (
        <>
            <Flex justify='center' wrap="wrap" gap="large">
                {characters.map((character) => (<CharacterCard key={character.id} {...character} />))}
            </Flex>
        </>
    )
}

export default CharacterGrid;