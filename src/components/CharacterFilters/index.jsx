import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Input, Select} from "antd";

function CharacterFilters({onFiltersChange, onSortChange}) {
    const { t } = useTranslation();

    const [status, setStatus] = useState('');
    const [species, setSpecies] = useState('');
    const [sortBy, setSortBy] = useState('');

    const handleApplyFilters = () => {
        onFiltersChange({status, species});
        onSortChange(sortBy)
    };

    return (
        <>
            <Select onChange={setStatus} placeholder='Select a status' options={[
                {value: 'Alive', label: <span>{t('status.alive')}</span>},
                {value: 'Dead', label: <span>{t('status.dead')}</span>},
                {value: 'Unknown', label: <span>{t('status.unknown')}</span>},
            ]}>
            </Select>
            <Select
                placeholder='Sort by'
                onChange={(value) => setSortBy(value)}
                options={[
                    { value: 'name-asc', label: 'Name A-Z' },
                    { value: 'name-desc', label: 'Name Z-A' },
                    { value: 'origin-asc', label: 'Origin A-Z' },
                    { value: 'origin-desc', label: 'Origin Z-A' },
            ]}>
            </Select>
            <Input placeholder="Search by species" onChange={(e)=>{setSpecies(e.target.value)}}/>
            <Button type="primary" onClick={handleApplyFilters}>{t('filters.apply')}</Button>
        </>
    );
}

export default CharacterFilters;