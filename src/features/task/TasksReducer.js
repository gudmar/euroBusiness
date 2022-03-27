import defaultState from '../../app/defaultState';

const taskReducer = (state, action) => {
    if (state === undefined) return defaultState;
    switch (action.type) {
        case 'tasks/add':{
            let tasks = [...state];
            tasks.push(action.payload);
            return [...tasks]
        }
        case 'tasks/removeLast': {
            let tasks = [...state];
            tasks.pop();
            return [...tasks]
        }
        case 'tasks/remove': {
            let tasks = [...state];
            tasks.splice(action.payload, 1);
            return [...tasks]
        }
        default: return state;
    }
}

export default taskReducer;