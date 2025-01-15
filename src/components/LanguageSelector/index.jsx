import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
    const { i18n } = useTranslation();

    const handleLanguageChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <div>
            <label htmlFor="language-select">Language: </label>
            <select
                id="language-select"
                value={i18n.language}
                onChange={handleLanguageChange}
            >
                <option value="en">English</option>
                <option value="de">Deutsch</option>
            </select>
        </div>
    );
}

export default LanguageSelector;