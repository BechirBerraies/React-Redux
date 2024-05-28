import {Route,Routes} from 'react-router-dom'
import './App.css';
import CreateUser from './components/CreateUser';
import Home from './components/Home';

function App() {
  return (
    <Routes>
      
      <Route path='/' element={<CreateUser/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
  );
}

export default App;
