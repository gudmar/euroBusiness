const add = (task) => { return {type:'tasks/add', payload: task}}
const removeLast = () => {return {type:'tasks/removeLast'}}
const remove = (index) => {return {type:'tasks/remove', payload: index}}

export {add, removeLast, remove}