import {useState} from "react";
import {useTranslation} from "react-i18next";

function CharacterFilters({ onFiltersChange }) {
    const [status, setStatus] = useState('');
    const [species, setSpecies] = useState('');
    const { t } = useTranslation();

    const handleApplyFilters = () => {
        onFiltersChange({ status, species });
    };

    return (
        <div className="character-filters">
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">{t('filters.status')}</option>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="unknown">Unknown</option>
            </select>
            <input
                type="text"
                placeholder="Search by species"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
            />
            <button onClick={handleApplyFilters}>{t('filters.apply')}</button>
        </div>
    );
}

export default CharacterFilters;