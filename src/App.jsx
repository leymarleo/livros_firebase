import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BooksPage from './views/BooksPage.jsx';
import SingleBookPage from './views/SingleBookPage.jsx';
import LoginPage from './views/LoginPage.jsx';
import AddBookPage from './views/AddBookPage.jsx';
import AddCarPage from './views/AddCarPage';
import CarsPage from './views/CarsPage';
import SingleCarPage from './views/SingleCarPage'; 

import { selectUsers } from './store/usersSlice.js';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(selectUsers);

  return (
    <>  
      {
        user.currentUser ?
        <BrowserRouter>
          <Routes>
            <Route index element={<BooksPage />} />
            <Route path="add-book" element={<AddBookPage />} />
            <Route path="book/:id" element={<SingleBookPage />} />
            <Route path="book-list" element={<BooksPage />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/add-car" element={<AddCarPage />} />
            <Route path="/car/:id" element={<SingleCarPage />} />
          </Routes>
        </BrowserRouter>
        : <LoginPage />
      }
    </>
  )
}

export default App;
