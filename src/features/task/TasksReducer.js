
const taskReducer = (state, action) => {
    const defaultState = {tasks: []}
    console.log(defaultState)
    if (state === undefined) return defaultState;
    switch (action.type) {
        case 'add':{
            console.log(state)
            let tasks = [...state.tasks];
            console.log(tasks)
            return tasks.push(action.payload)
        }
        case 'removeLast': {
            let tasks = [...state];
            return [...tasks.pop()]
        }
        case 'remove': {
            let tasks = [...state];
            tasks.splice(action.payload, 1);
            return [...tasks]
        }
        default: return state;
    }
}

export default taskReducer;