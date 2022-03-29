import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import {
  add,
  removeLast,
  remove
} from './actions';
import styles from './Tasks.module.css';
import store from '../../app/store.js'





const Tasks = () => {
    const store = useStore();
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks)
    const taskBox = useRef();
    const addTask = (payload) => dispatch(add(payload))
    const remTask = (payload) => dispatch(remove(payload))
    const remLastTask = () => dispatch(removeLast())
    const removeNthTask = (taskNumber) => { console.log(taskNumber); return remTask(taskNumber);}

    useEffect(()=>{console.log(store.getState())})

    const [currentText, setCurrnetText] = useState('');

    const log = () => {console.log(tasks)}

    const singleTask = ({message, index}) => {
        return (
            <div className={styles.newLine} key={index} ariaLabel = {index}>
                <span className="message">{message}</span>
                <button onClick={ () => removeNthTask(index)}>-</button>
            </div>
        )
    }

    const listOfTasks = (tasks) => {
        if (tasks.length < 1) return null;
        return (
            <div className={styles.list}>
                {tasks.map((item, index) => singleTask({message:item, index: index}))}
            </div>
        )
    }



    return (
        <div className="wrapper">
            {listOfTasks(tasks)}
            <input type = "text" value = {currentText} ref={taskBox} onChange={(e) => setCurrnetText(e.target.value)}/>
            <button onClick={() => addTask(taskBox.current.value) }>+</button>
            <button onClick={() => remLastTask()}>-</button>}
        </div>
          )
}

export default Tasks;