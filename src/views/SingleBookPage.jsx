import { useParams, Link, useNavigate } from 'react-router-dom';
import Notes from '../components/Notes.jsx';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectBooks, eraseBook, toggleRead } from '../store/booksSlice.js';
//import { eraseBookNotes } from '../store/notesSlice.js';
import { useEffect, useState } from 'react';
import {doc, getDoc, deleteDoc, updateDoc} from 'firebase/firestore';
import { db } from '../firebase/config.js';


function SingleBookPage() {
  //const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEraseBook = async (id)=> {
    if (confirm('Você tem certeza que deseja apagar este livro e todas as notas associadas a ele?')) {
      // dispatch(eraseBook(id));
      // dispatch(eraseBookNotes(id));
      try{
        await deleteDoc(doc(db, "livros", id));
      }catch(error){
        console.log(error)
      }
      navigate("/");
    }
  }

  const { id } = useParams();
  const [book, setBook] = useState("")

  // const books = useSelector(selectBooks);
  // const book = books.filter(book => book.id == id)[0];

  useEffect(()=>{
    const fetchBook = async(book_id)=>{
      try{
        const docRef = doc(db, "livros", book_id);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
          setBook({id: docSnap.id, ...docSnap.data()});
        }
      }catch(err){
        console.log(err);
      } 
      
    }
    setBook(id);
    fetchBook(id);
  },[]
 );

 const handleToggleRead = async (book)=>{
  const bookRef = doc(db, "livros", book.id);

  try{

    await updateDoc(bookRef, {isRead: !book.isRead});
  }catch(error){

    console.error(`Erro ao atualizar ${error}`);
    console.log(`Erro ao atualizar ${error}`);

  }
  setBook({...book, isRead: !book.isRead});
 }

  return (
    <>
      <div className="container">
        <Link to="/">
          <button className="btn">
            ← Voltar para Livros (Back to Books)
          </button>
        </Link>

        {book ? (
          <div>
            <div className="single-book">
              <div className="book-cover">
                <img src={book.cover} />
              </div>

              <div className="book-details">
                <h3 className="book-title">{book.title}</h3>
                <h4 className="book-author">{book.author}</h4>
                <p>{book.synopsis}</p>
                <div className="read-checkbox">
                  <input
                    onClick={() => handleToggleRead(book)}
                    type="checkbox"
                    defaultChecked={book.isRead}
                  />
                  <label>{book.isRead ? "Já Lido " : "Ainda Não Lido" }</label>
                </div>
                <div onClick={() => handleEraseBook(book.id)} className="erase-book">
                  Apagar livro (Erase book)
                </div>
              </div>
            </div>

            <Notes bookId={id} />
          </div>
        ) : (
          <div>
            <p>Livro não encontrado. Clique no botão acima para voltar para a lista de livros. </p>
          </div>
        )}
      </div>
    </>
  );
}

export default SingleBookPage;
