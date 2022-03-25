const increment = () => {console.log('inc'); return {type:'increment'}};
const decrement = () => {console.log('dec'); return {type:'decrement'}};
const incrementStep = (step) => {return {type:'counter/incrementStep', payload: step};}
const decrementStep = (step) => {return {type:'counter/decrementStep', payload: step};}
const setValue = (value) => {console.log('set'); return {type:'setValue', payload: value};}

export {increment, decrement, incrementStep, decrementStep, setValue}