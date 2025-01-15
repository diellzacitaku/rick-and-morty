import { useQuery } from "@apollo/client";
import { useState } from "react";
import GET_CHARACTERS from "./GetCharacters";
import CharacterTable from "./CharacterTable";

function DisplayTable() {
    const [status, setStatus] = useState("");
    const [species, setSpecies] = useState("");
    const [page, setPage] = useState(1);

    const { loading, error, data, refetch } = useQuery(GET_CHARACTERS, {
        variables: { page, status, species },
    });

    const handleFilterChange = () => {
        refetch({ page, status, species });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <div>
                <label>
                    Status:
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">All</option>
                        <option value="Alive">Alive</option>
                        <option value="Dead">Dead</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </label>
                <label>
                    Species:
                    <input
                        type="text"
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                        placeholder="Enter species"
                    />
                </label>
                <button onClick={handleFilterChange}>Apply Filters</button>
            </div>
            <CharacterTable data={data.characters.results} />
        </div>
    );
}

export default DisplayTable;