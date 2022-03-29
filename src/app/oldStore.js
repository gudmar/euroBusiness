
import { createStore } from 'redux';
import oldCounterReducer from '../features/oldCounter/oldCounterReducer';
import oldTaskReducer from '../features/oldTasks/oldTasksReducer';
import defaultState from './defaultState';

const rootReducer = (state = {counter: 2, tasks: 'someTask'}, action) => {
    return {
        counter: oldCounterReducer(state.counter, action),
        tasks: oldTaskReducer(state.tasks, action)
    }
}

const oldStore = createStore(rootReducer, defaultState)
console.log(JSON.stringify(oldStore.getState()))
export {rootReducer, oldStore} 



// https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#creating-the-root-reducer
