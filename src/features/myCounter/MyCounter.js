import React, { useState } from 'react';
// import { createStore } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementStep,
  decrementStep,
  setValue
} from './actions';
import styles from './MyCounter.module.css';



const MyCounter = () => {

    // const store = createStore(myReducer, {counter: 1});
    const currentVal = useSelector(state => state.counter)
    const dispatch = useDispatch();
    const inc = () => {dispatch(increment())}
    const dec = () => {dispatch(decrement())}
    const change = (e) => {dispatch(setValue(parseInt(e.target.value)))}
    const log = () => {console.log(currentVal)}
// const myValue = useSelector()
console.log(currentVal)


    return (
        <div className="wrapper">
            <button onClick={dec}>-</button>
            <input type="number" value = {currentVal} onChange={change}></input>
            <button onClick={inc}>+</button>
            <button onClick={log}>log</button>
        </div>
          )
}

export default MyCounter;