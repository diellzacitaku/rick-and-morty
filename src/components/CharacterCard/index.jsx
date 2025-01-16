import { useTranslation } from "react-i18next";
import "./style.css";
import { Card } from "antd";

function CharacterCard({ name, status, species, gender, origin, image }) {
    const { t } = useTranslation();

    return (
        <Card
            className={status === "Dead" ? "character-card-dead" : "character-card"}
            style={{width:380, height:580}}
        >
            <div className="card-status">
                {t("status.status")}: {t(`status.${status.toLowerCase()}`)}
            </div>

            <div className="card-image">
                <img src={image} alt={name} />
            </div>

            <h3 className="card-name">{name}</h3>

            <div className="card-details">
                <p>{t("origin.origin")}: {origin.name}</p>
                <p>{t("gender.gender")}: {gender}</p>
                <p>{t("filters.species")}: {species}</p>
            </div>
        </Card>
    );
}

export default CharacterCard;