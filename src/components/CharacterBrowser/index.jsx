import CharacterFilters from "../CharacterFilters";
import CharacterGrid from "../CharacterGrid";
import {gql, useQuery} from "@apollo/client";
import {useEffect, useState} from "react";
import { Pagination } from "antd";


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
            info {
                count
                pages
                next
                prev
            }
        }
    }
`;

function sortCharacters(characters, sortBy){
    let sortedCharacters = [...characters];
    switch (sortBy){
        case 'name-asc':
            console.log("asc")
            sortedCharacters.sort((a, b) => a.name.localeCompare(b.name))
            break;
        case 'name-desc':
            sortedCharacters.sort((a, b) => b.name.localeCompare(a.name))
            break;
        case 'origin-asc':
            sortedCharacters.sort((a, b) => a.origin.name.localeCompare(b.origin.name));
            break;
        case 'origin-desc':
            sortedCharacters.sort((a, b) => b.origin.name.localeCompare(a.origin.name))
            break
    }

    return sortedCharacters
}

function CharacterBrowser() {
    const [characters, setCharacters] = useState([]);
    const [sortedCharacters, setSortedCharacters] = useState([]);

    const [filters, setFilters] = useState({ status: '', species: '' });
    const [sortBy, setSortBy] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({ pages: 1 });

    const { refetch } = useQuery(GET_CHARACTERS, {
        skip: true,
    });

    const fetchCharacters = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data } = await refetch({ ...filters, page: currentPage });
            setCharacters(data.characters.results);
            setPageInfo(data.characters.info);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters();
    }, [filters, currentPage]);

    useEffect(() => {
        setSortedCharacters(sortCharacters(characters, sortBy));
    }, [characters, sortBy]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <CharacterFilters
                onFiltersChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
                onSortChange={(sortBy)=> setSortBy(sortBy)}
            />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
                <>
                    <CharacterGrid characters={sortedCharacters} />
                    <Pagination
                        current={currentPage}
                        total={pageInfo.pages * 5}
                        pageSize={10}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                </>
            )}
        </>
    );
}

export default CharacterBrowser;