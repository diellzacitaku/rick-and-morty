import {useTranslation} from 'react-i18next';
import {Select} from "antd";

function LanguageSelector() {
    const {t, i18n} = useTranslation();

    const handleLanguageChange = (value) => {
        i18n.changeLanguage(value);
    };

    return (
        <>
            <Select onChange={handleLanguageChange} defaultValue='en' placeholder='Select language' options={[
                {value: 'en', label: <span>{t('language.english')}</span>},
                {value: 'de', label: <span>{t('language.german')}</span>},
            ]}>
            </Select>
        </>
    );
}

export default LanguageSelector;