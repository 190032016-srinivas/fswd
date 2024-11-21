import { configureStore } from '@reduxjs/toolkit';
import bookslice from './Bookslice';

const store = configureStore({
  reducer: {
    books: bookslice, 
  },
});

export default store;
