import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  add,
  removeLast,
  remove
} from './actions';
import styles from './Tasks.module.css';
import store from '../../app/store.js'





const Tasks = () => {
    console.log(store.getState())
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks)
    console.log(tasks)
    const addTask = (payload) => dispatch(add(payload))
    const remTask = (payload) => dispatch(remove(payload))
    const remLastTask = () => dispatch(removeLast())
    const removeNthTask = ({taskNumber}) => { return remTask(taskNumber);}

    const [currentText, setCurrnetText] = useState('');

    const log = () => {console.log(tasks)}

    const singleTask = ({message, index}) => {
        return (
            <div className={styles.newLine} key={index}>
                <span className="message">{message}</span>
                <button onClick={removeNthTask(index)}>-</button>
            </div>
        )
    }

    const listOfTasks = (tasks) => {
        return (
            <div className={styles.list}>
                {tasks.map((item, index) => singleTask({message:index, index: index}))}
            </div>
        )
    }
// const myValue = useSelector()



    return (
        <div className="wrapper">
            {listOfTasks(tasks)}
            <input type = "text" value = {currentText} onChange={(e) => setCurrnetText(e.target.value)}/>
            <button onClick={() => dispatch(addTask())}>+</button>
            <button onClick={() => dispatch(remLastTask())}>-</button>}
        </div>
          )
}

export default Tasks;