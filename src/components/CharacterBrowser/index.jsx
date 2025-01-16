import CharacterFilters from "../CharacterFilters";
import CharacterGrid from "../CharacterGrid";
import {useQuery} from "@apollo/client";
import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {GET_CHARACTERS} from "../../utils/query.js";

function sortCharacters(characters, sortBy) {
    let sortedCharacters = [...characters];
    switch (sortBy) {
        case 'name-asc':
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
    const [filters, setFilters] = useState({status: '', species: ''});
    const [sortBy, setSortBy] = useState('');
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({count: 0, pages: 1});

    const {data, loading, error} = useQuery(GET_CHARACTERS, {
        variables: {page: currentPage, ...filters},
    });

    useEffect(() => {
        if (!data?.characters) return;

        if (currentPage === 1) {
            setCharacters(data.characters.results);
        } else {
            setCharacters((prev) => [...prev, ...data.characters.results]);
        }

        setPageInfo(data.characters.info);
    }, [data, currentPage]);

    useEffect(() => {
        setCharacters([]);
        setCurrentPage(1);
    }, [filters]);

    const sortedCharacters = sortCharacters(characters, sortBy);

    const fetchMoreCharacters = () => {
        if (pageInfo.next) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handleFiltersChange = (newFilters) => {
        setFilters((prev) => ({...prev, ...newFilters}));
    };

    const handleSortChange = (sortValue) => {
        setSortBy(sortValue);
    };

    return (
        <>
            <CharacterFilters
                onFiltersChange={handleFiltersChange}
                onSortChange={handleSortChange}
            />

            {loading && characters.length === 0 && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            {!error && (
                <InfiniteScroll
                    dataLength={sortedCharacters.length}
                    next={fetchMoreCharacters}
                    hasMore={!!pageInfo.next}
                    loader={<p>Loading more...</p>}
                    endMessage={<p>No more data!</p>}
                    style={{overflow: "visible"}}
                >
                    <CharacterGrid characters={sortedCharacters}/>
                </InfiniteScroll>
            )}
        </>
    );
}

export default CharacterBrowser;