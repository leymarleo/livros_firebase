import Book from '../components/Book.jsx';
import Header from '../components/Header.jsx';
import {useSelector} from 'react-redux';

//import {selectBooks} from '../store/booksSlice.js';
import { db } from '../firebase/config.js'
import { collection,query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { selectUsers } from '../store/usersSlice.js';

function BooksPage() {

  //const books = useSelector(selectBooks);
  const uid = useSelector(selectUsers).currentUser.id
  const email = useSelector(selectUsers).currentUser.email
  console.log(email)

  const  [books, setBooks] = useState([])

  useEffect(()=>{
    const fetchBooks = async()=>{
      const q = query(collection(db, "livros"), where("user_id","==", uid)); // a parte final where("user_id","==", uid));
                                                                              // restringe os livros para cada usuario individual
      const querySnapshot = await getDocs(q)                                  // se retirar esse final, todos usarios compartilham
      let booklist = []                                                       // todos os livros juntos.
      querySnapshot.forEach((doc) => {
        booklist.push({id: doc.id, ...doc.data()})
        console.log(booklist)
      }

      )
      setBooks(booklist)

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
  