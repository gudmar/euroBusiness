import styles from './pawn.module.css';
import { useDispatch, useSelector, useStore } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { move, setDiceResult, moveOneField } from '../../state/playerSlice';

const Pawn = props => {
    const player = useSelector(state => state.playerSlice[props.color]);
    const board = useSelector(state => state.boardSlice)
    const fieldNumber = useSelector(state => state.playerSlice[props.color].fieldNumber);
    const diceResult = useSelector(state => state.playerSlice.diceResult);
    const currentPlayer = useSelector(state => state.playerSlice.currentPlayer);
    const store = useStore();
    const pawn = useRef();
    const spacing = 5;
    const dispatch = useDispatch();
    const getMiddleCords = (fieldNr) => {
        try {
            const { left, right, top, bottom } = board.fieldDescriptors[fieldNr];
            const average = (a, b) => (a + b) / 2;
            const x = average(left, right);
            const y = average(top, bottom)
            if (player.color === 'blue') console.log(fieldNr, left, right, top ,bottom, x, y)
            return {x: average(left, right), y: average(top, bottom)}
        }
        catch(e){
            return {x: -30, y: -30}
        }
    }
    const placePawn = cords => {
        try {
            const {width, height} = pawn.current.getBoundingClientRect();
            if (props.color === 'orange') return {
                x: cords.x - 0.5 * width - spacing,
                y: cords.y - 0.5 * height - spacing,
            };
            if (props.color === 'red') return {
                x: cords.x + 0.5 * width + spacing,
                y: cords.y - 0.5 * height - spacing,
            }
            if (props.color === 'green') return {
                x: cords.x - 0.5 * width - spacing,
                y: cords.y + 0.5 * height + spacing
            }
            return {
                x: cords.x + 0.5 * width + spacing,
                y: cords.y + 0.5 * height + spacing
            }
        } catch (error) {
            return {
                x: -50, y: -50
            }
        }
    }
    const substrPawnOffset = cords => {
        try {
        const {width, height} = pawn.current.getBoundingClientRect();
        return {
            x: cords.x - width/2,
            y: cords.y - height/2
        }
        }
        catch(e) {
            return {x:-50, y:-50}
        }

    }
    const [cords, setCords] = useState();
    useEffect(() => {
        
        if (diceResult > 0) {  
            const t = setTimeout(() => {
                console.log(diceResult)
                const nextField = fieldNumber + 1;
                if (nextField > 40) nextField = 0;
                // dispatch(move({player: currentPlayer, nrOfFields: nextField}));
                // dispatch(setDiceResult([diceResult - 1, 0]));
                console.log(currentPlayer)
                dispatch(moveOneField(currentPlayer));
                console.log(diceResult, nextField)
                clearTimeout(t);
            }, 1000);
        }
    }, [diceResult]);

    useEffect(() => {
        if (player.color === 'blue') console.log(fieldNumber)
        if (board.fieldDescriptors.length > 0) {
            setCords(getMiddleCords(fieldNumber))
        }
    }, [fieldNumber]);

    return (
        <div 
            ref = {pawn}
            className={`${styles.pawn}`} 
            style={
                {
                    backgroundColor: props.color, 
                    left: substrPawnOffset(placePawn(getMiddleCords(fieldNumber))).x + 'px', 
                    top: substrPawnOffset(placePawn(getMiddleCords(fieldNumber))).y + 'px'
                }
            }
        >
        </div>
    )
}

Pawn.propTypes = {
    color: PropTypes.string.isRequired,
    fieldNumber: PropTypes.number,
}

export default Pawn;