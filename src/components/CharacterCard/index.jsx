import PropTypes from "prop-types";
import "./style.css";

function CharacterCard({name, status, species, gender, origin, image}) {
    return (
        <div>
            <img src={image} alt={name}/>
            <h3>{name}</h3>
            <p>Status: {status}</p>
            <p>Species: {species}</p>
            <p>Gender: {gender}</p>
            <p>Origin: {origin.name}</p>
        </div>
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