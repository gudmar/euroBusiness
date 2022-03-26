import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import counterReducer from '../features/myCounter/MyCounterReducer';
import taskReducer from '../features/task/TasksReducer'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    tasks: taskReducer
  },
  preloadedState: {
      counter: 0,
      tasks: []
  }
});

export default store;
