import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import MyCounter from './features/myCounter/MyCounter';
import Tasks from './features/task/Tasks'
import Center from './features/center/center';
import OldCounter from './features/oldCounter/oldCounter';
import OldTasks from './features/oldTasks/OldTasks';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import  store  from './app/store';
import { oldStore, rootReducer } from './app/oldStore'

console.log(store.getState());
console.log(oldStore.getState());

function App() {
  return (

    <>

    {/* <div className="App"> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div> */}


    <Center>
      <div className="column">
        <h1>Redux examples</h1>
        <p>Two examples of redux handling a counter and a task list components. First without redux-toolkit, and the second with the toolkit.
          <b>So there are 2 storages!!</b> and having more than one storage in the application is strongly discouraged.
        </p>
        <p>
          On the other hand redux alows to have more than one stores, and it is interesting how to implement this case.
          Moreover this allows to test 2 things within one repo :)
        </p>
      </div>
    </Center>
    <div className="row">
    <Provider store = {store}>
      <div className="column">
        <h2>With toolkit</h2>
        <Center>
          <MyCounter />
        </Center>
        <Center>
          <Tasks />
        </Center>
      </div>
    </Provider>


  <Provider store = {oldStore}>
      <div className="column" store={oldStore}>
      <h2>No toolkit</h2>
        <Center>
          <OldCounter />
        </Center>
        <Center>
          <OldTasks />
        </Center>
      </div>
    </Provider>

    </div>
  

  </>


  );
}

export default App;
