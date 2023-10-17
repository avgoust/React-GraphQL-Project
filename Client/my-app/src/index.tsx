import * as ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import {ApolloClient , ApolloProvider , InMemoryCache , createHttpLink} from "@apollo/client";


const dbLink=createHttpLink(
  {uri : "http://localhost:4000"}
);

const client = new ApolloClient({
  cache : new InMemoryCache({
  addTypename: false 
  }),
  link:dbLink
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement 
);


root.render(
  <Router>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </Router>
);