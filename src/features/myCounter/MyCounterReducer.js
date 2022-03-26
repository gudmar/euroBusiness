const myReducer = (state, action) => {
    console.log(action.type)
    console.log(state)
    if (state === undefined) return {counter: 0}
    switch (action.type) {
        case 'increment':
            return {...state, counter: state.counter + 1}
            break;
        case 'decrement':
            return {...state, counter: state.counter - 1}
            break;
        case 'reset':
            return {...state, counter: 0}
            break;
        case 'incrementStep':
            return {...state, counter: state.counter + action.payload}
            break;
        case 'decrementStep':
            return {...state, counter: state.counter - action.payload}
            break;
        case 'setValue':
            return {...state, counter: action.payload}
            break;

        default:
            return state;
    }
}

export default myReducer;