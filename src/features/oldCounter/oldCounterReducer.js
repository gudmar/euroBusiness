import defaultState from '../../app/defaultState';

const myReducer = (state, action) => {
    if (state === undefined) return defaultState.conuter;
    let newState = state;
    
    switch (action.type) {
        case 'counter/increment':
            newState++;
            return newState;
        case 'counter/decrement':
            newState--;
            return newState;
        case 'counter/reset':
            return {...state, counter: 0}
            break;
        case 'counter/incrementStep':
            return {...state, counter: state.counter + action.payload}
            break;
        case 'counter/decrementStep':
            return {...state, counter: state.counter - action.payload}
            break;
        case 'counter/setValue':
            return action.payload;
            break;
        case 'counter/log':
            console.log(state)
            return state;
            break;            

        default:
            return state;
    }
}

export default myReducer;