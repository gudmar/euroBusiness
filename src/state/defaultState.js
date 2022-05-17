import { boardDescriptorCreator } from './defaultBoardState.js';
import { defaultPlayerStateConstructor } from './defaultPlayerState.js';

const defaultState = {
    playerSlice: defaultPlayerStateConstructor(),
    boardSlice: boardDescriptorCreator(),
    control: {
        openFieldWindow: false,
    }
}

export default defaultState;