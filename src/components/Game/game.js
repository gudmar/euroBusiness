import styles from './game.module.css';
import { useDispatch, useSelector, useStore } from 'react-redux';
import PropTypes from 'prop-types';
import Board from '../board/board.js'
import Pawn from '../pawn/pawn.js';
import { useEffect } from 'react';


const Game = props => {
    const store = useStore();
    useEffect(() => {console.log(store.getState())})
    return (
        <div className={`${styles.game}`}>
            <Board />
        </div>
    )
}

export default Game;