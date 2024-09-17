import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice.js';
import notesReducer from './notesSlice.js';
import usersReducer from './usersSlice.js';
import carsReducer from './carsSlice';

export default configureStore({
  reducer: { 
    books: booksReducer,
    notes: notesReducer,
    users: usersReducer,
    cars: carsReducer,
  }
})