import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import BooksPage from './Components/BooksPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/booksPage' element={<BooksPage/>}/>
        </Routes>
    </BrowserRouter>    
  );
}

export default App;
