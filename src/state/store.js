import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import  exampleSlice  from './exampleSlice.js';
import thunkMiddleware from 'redux-thunk';
import boardSlice from './boardSlice';


const store = configureStore({
  reducer: {
    boardSlice,
    
  },
  middleware: [
    thunkMiddleware,
  ]

});

export default store;
