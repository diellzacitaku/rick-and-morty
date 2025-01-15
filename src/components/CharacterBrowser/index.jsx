import CharacterFilters from "../CharacterFilters";
import CharacterGrid from "../CharacterGrid";
import {gql, useQuery} from "@apollo/client";
import {useEffect, useState} from "react";

const GET_CHARACTERS = gql`
    query GetCharacters($page: Int, $status: String, $species: String) {
        characters(page: $page, filter: { status: $status, species: $species }) {
            results {
                id
                name
                status
                species
                gender
                origin {
                    name
                }
                image
            }
        }
    }
`;


function CharacterBrowser() {
    const [filters, setFilters] = useState({status: '', species: ''});
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {refetch} = useQuery(GET_CHARACTERS, {
        skip: true,
    });

    const fetchCharacters = async () => {
        setLoading(true);
        setError(null);

        try {
            const {data} = await refetch(filters);
            setCharacters(data.characters.results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters();
    }, [filters]);

    const handleFiltersChange = (newFilters) => {
        setFilters((prev) => ({...prev, ...newFilters}));
    };

    return (
        <>
            <CharacterFilters onFiltersChange={handleFiltersChange}/>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && <CharacterGrid characters={characters}/>}
        </>
    )
}

export default CharacterBrowser;