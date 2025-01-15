import "./CharacterTable.css";

function CharacterTable({data}) {
    return (
        <table className="character-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Species</th>
                <th>Gender</th>
                <th>Origin</th>
            </tr>
            </thead>
            <tbody>
            {data.map(({ id, name, status, species, gender, origin }) => (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{status}</td>
                    <td>{species}</td>
                    <td>{gender}</td>
                    <td>{origin.name}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default CharacterTable;
