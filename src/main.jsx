import './index.css'
import * as ReactDOM from 'react-dom/client';
import App from './components/App'
import {ApolloClient, InMemoryCache, ApolloProvider,} from '@apollo/client';
import {RICK_AND_MORTY_API} from "./utils/constants.js";

const client = new ApolloClient({
    uri: RICK_AND_MORTY_API,
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
);