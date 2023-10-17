import './styles/Import.css';
import './styles/App.css';
import './styles/NavBar.css';
import { Route, Routes } from 'react-router-dom';
import Export from './pages/Export';
import NavBar from './components/NavBar';
import Import from './pages/Import';
import  Users  from './pages/Users';


function App() {
  return (
    <div>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <NavBar/>
        <Routes>
          <Route path='/' Component={Users}></Route>
          <Route path='/Users' Component={Users}></Route>
          <Route path='/Import' Component={Import}></Route>
          <Route path='/Export' Component={Export}></Route>
        </Routes>
    </div>
  )
}
export default App;