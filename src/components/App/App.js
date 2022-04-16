import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import Center from '../center/center';
// import Board from '../board/board'
import Game from '../Game/game.js'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import  store  from '../../state/store';

function App() {
  return (
    <><Game /></>
  );
}

export default App;
