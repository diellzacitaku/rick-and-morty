import {useState} from "react";
import {useTranslation} from "react-i18next";
import {AutoComplete, Button, Select} from "antd";

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

        onFiltersChange({ status: "", species: "" });
        onSortChange("");
    };

    return (
        <>
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
                    {value: 'none', label: 'No sort'},
                    {value: 'name-asc', label: 'Name A-Z'},
                    {value: 'name-desc', label: 'Name Z-A'},
                    {value: 'origin-asc', label: 'Origin A-Z'},
                    {value: 'origin-desc', label: 'Origin Z-A'},
                ]}
            />

            <AutoComplete
                value={species}
                onSearch={handleSpeciesChange}
                placeholder="Search by species"
                style={{width: 200}}
            />

            <Button type="primary" onClick={handleClearFilters}>
                Clear Filters
            </Button>
        </>
    );
}

export default CharacterFilters;