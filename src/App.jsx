import './App.css'
import {gql, useQuery} from "@apollo/client";

const GET_CHARACTERS = gql`
  query GetCharacters {
  characters {
    results {
      id,
      name,
      status
      species
      gender
      origin {
        name
      }
    }
  }
}
`;

function App() {
  return (
    <>
        <DisplayTable />
    </>
  )
}


function DisplayTable() {
    const query = useQuery(GET_CHARACTERS);

    const loading = query.loading;
    const error = query.error
    const data = query.data;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return data.characters.results.map(({ id, name, status, species, gender, origin }) => (
        <div key={id}>
            <h3>{name}</h3>
            <br />
            <h3>{status}</h3>
            <h3>{species}</h3>
            <h3>{gender}</h3>
            <h3>{origin.name}</h3>
        </div>
    ));
}


export default App
