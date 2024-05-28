import {Route,Routes} from 'react-router-dom'
import './App.css';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <Routes>
      
      <Route path='/' element={<CreateUser/>}/>
    
    </Routes>
  );
}

export default App;
