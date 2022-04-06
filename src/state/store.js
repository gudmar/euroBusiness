import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import  exampleSlice  from './exampleSlice.js';
import thunkMiddleware from 'redux-thunk';


const store = configureStore({
  reducer: {
    exampleSlice,
    
  },
  middleware: [
    thunkMiddleware,
  ]

});

export default store;
