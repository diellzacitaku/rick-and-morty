import {useState} from "react";
import {useTranslation} from "react-i18next";
import {AutoComplete, Button, Flex, Select} from "antd";
import './style.css';

function CharacterFilters({onFiltersChange, onSortChange}) {
    const {t} = useTranslation();

    const [status, setStatus] = useState('');
    const [species, setSpecies] = useState('');
    const [sortBy, setSortBy] = useState('');

    const handleStatusChange = (status) => {
        setStatus(status);
        onFiltersChange({status, species});
    };

    const handleSpeciesChange = (searchValue) => {
        setSpecies(searchValue);
        onFiltersChange({status, species: searchValue})
    }

    const handleSortChange = (sortValue) => {
        setSortBy(sortValue);
        onSortChange(sortValue);
    };

    const handleClearFilters = () => {
        setStatus("");
        setSpecies("");
        setSortBy("");

        onFiltersChange({status: "", species: ""});
        onSortChange("");
    };

    return (
        <div
            className='filter-bar'
        >
            <AutoComplete
                value={species}
                onSearch={handleSpeciesChange}
                placeholder="Search by species"
                style={{width: "100%"}}
            />
            <Flex gap="16px">
                <Select
                    value={status || undefined}
                    onChange={handleStatusChange}
                    placeholder="Select a status"
                    style={{width: 160}}
                    options={[
                        {value: 'Alive', label: t('status.alive')},
                        {value: 'Dead', label: t('status.dead')},
                        {value: 'Unknown', label: t('status.unknown')},
                    ]}
                />

                <Select
                    value={sortBy || undefined}
                    onChange={handleSortChange}
                    placeholder="Sort by"
                    style={{width: 160}}
                    options={[
                        {value: 'name-asc', label: 'Name A-Z'},
                        {value: 'name-desc', label: 'Name Z-A'},
                        {value: 'origin-asc', label: 'Origin A-Z'},
                        {value: 'origin-desc', label: 'Origin Z-A'},
                    ]}
                />
                <Button type="primary" className="red" onClick={handleClearFilters}>
                    Clear Filters
                </Button>
            </Flex>
        </div>
    );
}

export default CharacterFilters;