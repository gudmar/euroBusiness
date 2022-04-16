import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import  exampleSlice  from './exampleSlice.js';
import thunkMiddleware from 'redux-thunk';
import boardSlice from './boardSlice';
import playerSlice from './playerSlice';


const store = configureStore({
  reducer: {
    boardSlice,
    playerSlice,
  },
  middleware: [
    thunkMiddleware,
  ]

});

export default store;
