import styles from './game.module.css';
import { useDispatch, useSelector, useStore } from 'react-redux';
import PropTypes from 'prop-types';
import Board from '../board/board.js'
import Pawn from '../pawn/pawn.js';
import { useEffect } from 'react';
import DicesRoller from '../dicesRoller/dicesRoller.js'
import { Button } from '@material-ui/core';

const Pawns = props => {
    const players = useSelector(state => state.playerSlice)
    console.log(players)
    const pawns = ['blue', 'red', 'green', 'orange'].map(item => 
        !players[item].hidden ? <Pawn key={item} color={item} /> : null
    )
    return pawns;
}

const Game = props => {
    const store = useStore();
    useEffect(() => {console.log(store.getState())})
    return (
        <div className={`${styles.game}`}>
            <DicesRoller />
            <Board />
            <Pawns />
            <Button onClick = {() => {
                console.log('State', store.getState())
            }}>{'Log state'}</Button>
        </div>
    )
}

export default Game;