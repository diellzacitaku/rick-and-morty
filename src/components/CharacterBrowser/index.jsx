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


function CharacterBrowser() {
    const [filters, setFilters] = useState({ status: '', species: '' });
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('');
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
            let sortedCharacters = data.characters.results;

            if (sortBy === 'name-asc') {
                sortedCharacters.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortBy === 'name-desc') {
                sortedCharacters.sort((a, b) => b.name.localeCompare(a.name));
            } else if (sortBy === 'origin-asc') {
                sortedCharacters.sort((a, b) => a.origin.name.localeCompare(b.origin.name));
            } else if (sortBy === 'origin-desc') {
                sortedCharacters.sort((a, b) => b.origin.name.localeCompare(a.origin.name));
            }
            setCharacters(data.characters.results);
            setPageInfo(data.characters.info);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFiltersChange = (newFilters) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
        if (newFilters.sortBy) {
            setSortBy(newFilters.sortBy);
        }
    };

    useEffect(() => {
        fetchCharacters();
    }, [filters, sortBy, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <CharacterFilters onFiltersChange={(newFilters) => setFilters({ ...filters, ...newFilters })} />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
                <>
                    <CharacterGrid characters={characters} />
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