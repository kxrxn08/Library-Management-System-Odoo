import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginForm/>} />
        </Routes>
    </BrowserRouter>    
  );
}

export default App;
