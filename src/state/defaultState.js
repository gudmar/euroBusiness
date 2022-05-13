import { boardDescriptorCreator } from './defaultBoardState.js';
import { defaultPlayerStateConstructor } from './defaultPlayerState.js';

const defaultState = {
    playerSlice: {

    },
    boardSlice: boardDescriptorCreator()
}

export default defaultState;