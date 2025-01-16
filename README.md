# Rick and Morty Challenge
ReactJS application that displays a list of Rick and Morty characters with different filtering options.
## Features Breakdown
### Filtering and Searching
- **Filters**: Filter characters by status (Alive, Dead, Unknown).
- **Search**: Search for characters species dynamically.

### Sorting
- Sort the characters based on their name and origin.

### Infinite Scrolling
- Automatically loads more characters as you scroll down the page.

### Multi-Language Support
- **English and German**: Users can toggle between English and German translations.

## How To Run
1. Clone the repo:
   ```bash
   git clone https://github.com/diellzacitaku/rick-and-morty.git
   cd rick-and-morty
   ```

2. Install the packages:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

## Technologies Used

### Frontend Framework
- **React**
- **Vite**

### GraphQL
- **Apollo Client**: For executing GraphQL queries.
- **GraphQL**: To interact with the Rick and Morty API.

### UI Components
- **Ant Design**: React UI library.
- **React-Infinite-Scroll-Component**: To implement the infinite scrolling functionality.

### Internationalization
- **React-i18next**: For language switching.

## File Structure

This project follows the folder structure based on [this StackOverflow answer](https://stackoverflow.com/questions/55221433/is-there-an-official-style-guide-or-naming-convention-for-react-based-projects) I found:

```
├── src
|   ├── actions // redux actions
|   ├── components // stateful and stateless reusable components that just display "stuff" -- stateful components change and manipulate the UI
|   ├── containers // stateful components that utilize the reusable "components" to CRUD data and/or are connected to redux
|   ├── images
|   ├── pages // utilize components/containers to display something when visiting a "/route"
|   ├── reducers // redux reducers
|   ├── root // aka "<App />" that combines "routes", redux and other top-level supporting files into one place
|   ├── routes // assigns "pages" to a "/route"
|   ├── styles // shared and/or global styles used by all "components"
|   ├── types // redux types
|   ├── utils // supporting app files: like test setup, custom polyfills, axios configurations, ...etc
|   └── index.js // a simple file that "ReactDOM.render"s the "App"
|
├── server.js // express setup to serve the "dist" folder
└── webpack.config.js

Component structure:
└── components
    └── Input
        ├── __tests__
        |   └── Input.test.js // jest unit tests for "index.js"
        ├── index.js // all required code/styles to be exported
        └── styles.scss // styles required by "index.js"
```

## API

This application uses the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) to fetch character data.

### Example Query
```graphql
query GetCharacters($page: Int, $status: String, $species: String) {
    characters(page: $page, filter: { status: $status, species: $species }) {
        results {
            id
            name
            status
            species
            gender
            origin {
                name
            }
            image
        }
    }
}
```

## Sources
- [Ant Design](https://ant.design/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [React-i18next](https://react.i18next.com/)
- [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql)
- [React Infinite Scroll Component](https://github.com/ankeetmaini/react-infinite-scroll-component)
