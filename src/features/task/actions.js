const add = (task) => {return {type:'add', payload: task}}
const removeLast = () => {return {type:'removeLast'}}
const remove = (index) => {return {type:'remove', payload: index}}

export {add, removeLast, remove}