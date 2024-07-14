import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import BooksPage from './Components/BooksPage';
import Temp from './Components/Temp';
import Admin from './Pages/Admin';
import Navbar from './Components/Navbar';
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/' element={<BooksPage/>}/>
        <Route path='/admin' element={<Admin/>} />
        <Route path="/temp" element={<Temp/>}/>
        </Routes>
    </BrowserRouter>    
  );
}

export default App;
