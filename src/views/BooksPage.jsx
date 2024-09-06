import Book from '../components/Book.jsx';
import Header from '../components/Header.jsx';
import {useSelector} from 'react-redux';

// import {selectBooks} from '../store/booksSlice.js'; importa da lista falsa

import { db } from '../firebase/config.js'
import { collection,query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { selectUsers } from '../store/usersSlice.js';

function BooksPage() {

  // const books = useSelector(selectBooks); busca na lista falsa
  const uid = useSelector(selectUsers).currentUser.id
  const email = useSelector(selectUsers).currentUser.email
  console.log(email)

  const  [books, setBooks] = useState([])

  useEffect(()=>{
    const fetchBooks = async()=>{
      const q = query(collection(db, "livros"))

      const querySnapshot = await getDocs(q)
      let booklist = []
      querySnapshot.forEach((doc) => {
        booklist.push({id: doc.id, ...doc.data()})
      }

      )
      setBooks(booklist)
      console.log(booklist)

    }

    fetchBooks()
    }, []  )

  const pageTitle = "📖 Lista de Livros Etec AE";
    
    
    return (
      <>
        <div className="container">
            <Header pageTitle={pageTitle} />
            <div className="books-container">
                <div className="books-list">
                    
                    {books.map(book => 
                    
                    <Book key={book.id} book={book}  />
                    
                    )}

                </div>
            </div>
        </div>
      </>
    )
  }
  
  export default BooksPage
  