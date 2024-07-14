import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import BooksPage from './Components/BooksPage';
import Temp from './Components/Temp';
import Admin from './Pages/Admin';
import Navbar from './Components/Navbar';
import Checkout from './Pages/Checkout';
import Dashboard from "./Pages/Dashboard"
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/' element={<BooksPage/>}/>
        <Route path='/admin' element={<Admin/>} />
<<<<<<< HEAD
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
=======
        <Route path="/temp" element={<Temp/>}/>
>>>>>>> d305c68995914ee8e085e3550b8e25de6aed6648
        </Routes>
    </BrowserRouter>    
  );
}

export default App;
