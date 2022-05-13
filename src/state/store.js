import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';
// import  exampleSlice  from './exampleSlice.js';
import thunkMiddleware from 'redux-thunk';
// import boardSlice from './boardSlice';
// import playerSlice from './playerSlice';
import defaultState from './defaultState.js';
import {
  boardReducer,
  boardActionTypes
  } from './boardReducer.js';
import { 
    playerReducer,
    playerActionTypes
  } from './playerReducer.js'
import {
  transactionsReducer, transactionActionTypes
} from './transactionsReducer.js'
const rootReducer = (state, {type, payload}) => {
  if (state === undefined) return defaultState;
  const playerTypes = Object.values(playerActionTypes);
  const boardTypes = Object.values(boardActionTypes);
  const transactionTypes = Object.values(transactionActionTypes)
  if (playerTypes.find(t => t === type)) return playerReducer(state, {type, payload});
  if (boardTypes.find(t => t === type)) return boardReducer(state, {type, payload});
  if (transactionTypes.find(t => t === type)) return transactionsReducer(state, {type, payload});
  return state;
}

const store = createStore(rootReducer);

// const store = configureStore({
//   reducer: {
//     rootReducer,
//   },
//   middleware: [
//     thunkMiddleware,
//   ]

// });

// const store = configureStore({
//   reducer: {
//     boardSlice,
//     playerSlice,
//   },
//   middleware: [
//     thunkMiddleware,
//   ]

// });



export default store;
