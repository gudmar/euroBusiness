
import { createStore } from 'redux';
import oldCounterReducer from '../features/oldCounter/oldCounterReducer';
import oldTaskReducer from '../features/oldTasks/oldTasksReducer';
import defaultState from './defaultState';

const rootReducer = (state = defaultState, action) => {
    return {
        counter: oldCounterReducer(state, action),
        tasks: oldTaskReducer(state, action)
    }
}

const oldStore = createStore(rootReducer, defaultState)

export {rootReducer, oldStore}



// https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#creating-the-root-reducer
