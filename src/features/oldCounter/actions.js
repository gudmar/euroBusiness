const increment = () => {console.log('inc'); return {type:'counter/increment'}};
const decrement = () => {console.log('dec'); return {type:'counter/decrement'}};
const incrementStep = (step) => {return {type:'counter/incrementStep', payload: step};}
const decrementStep = (step) => {return {type:'counter/decrementStep', payload: step};}
const setValue = (value) => {console.log('set'); return {type:'counter/setValue', payload: value};}
const logState = () => {return {type:'counter/log'}}

export {increment, decrement, incrementStep, decrementStep, setValue, logState}