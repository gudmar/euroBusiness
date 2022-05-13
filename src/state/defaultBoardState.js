import {boardInOrder, descriptors} from './boardFields.js';
import boardFieldView from '../view/board.js'

const boardDescriptorCreator = (stateDescriptor = descriptors, viewDescriptor = boardFieldView, orderArray = boardInOrder) => {
    return orderArray.map((item, index) => {
        return { 
            id: item,
            ...viewDescriptor[item],
            ...stateDescriptor[item],
        }
    });
}  // board.js

const defaultBoardState = {
    boardFields: [],
}
export default defaultBoardState;

export {boardDescriptorCreator}