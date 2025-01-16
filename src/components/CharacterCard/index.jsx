import PropTypes from "prop-types";
import "./style.css";
import {Card} from "antd";

function CharacterCard({name, status, species, gender, origin, image}) {
    return (
        <Card
            className={status === "Dead" ? "character-card-dead" : "character-card"}
            cover={<img alt={name} src={image}/>}
        >
            <h3>{name}</h3>
            <p>Status: {status}</p>
            <p>Species: {species}</p>
            <p>Gender: {gender}</p>
            <p>Origin: {origin.name}</p>
        </Card>
    );
}

CharacterCard.propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    origin: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.string.isRequired,
};

export default CharacterCard;