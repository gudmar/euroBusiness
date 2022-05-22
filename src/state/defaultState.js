import { boardDescriptorCreator } from './defaultBoardState.js';
import { defaultPlayerStateConstructor } from './defaultPlayerState.js';
import { gameStateConstructor } from './gameStateConstructor.js'

const defaultState = {
    playerSlice: defaultPlayerStateConstructor(),
    boardSlice: boardDescriptorCreator(),
    control: {
        openFieldWindow: false,
    },
    game: gameStateConstructor(),
}

export default defaultState;