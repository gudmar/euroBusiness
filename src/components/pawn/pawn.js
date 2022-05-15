import styles from './pawn.module.css';
import { useDispatch, useSelector, useStore } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
// import { move, setDiceResult, moveOneField, disactivateDice } from '../../state/playerSlice';
import { move, setDiceResult, moveOneField, disactivateDice } from '../../state/playerActions';

const Pawn = props => {
    const player = useSelector(state => state.playerSlice[props.color]);
    const board = useSelector(state => state.boardSlice)
    const fieldNumber = useSelector(state => state.playerSlice[props.color].fieldNumber);
    const diceResult = useSelector(state => state.playerSlice.diceResult);
    const diceThrown = useSelector(state => state.playerSlice.diceThrown);
    const currentPlayer = useSelector(state => state.playerSlice.currentPlayer);
    const store = useStore();
    const pawn = useRef();
    const spacing = 5;
    const dispatch = useDispatch();
    const getMiddleCords = (fieldNr) => {
        try {
            const { left, right, top, bottom } = board[fieldNr];
            const average = (a, b) => (a + b) / 2;
            const x = average(left, right);
            const y = average(top, bottom)
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

    // const movePawn = delay => {
    //     return new Promise(resolve => {
    //         const t = setTimeout(() => {
    //             clearTimeout(t);
    //             dispatch(moveOneField(currentPlayer));
    //             resolve(true);
    //         }, delay)
    //     })
    // }
    const doAfterDelay = (actionCallack, args) => delay => {
        return new Promise(resolve => {
            const t = setTimeout(() => {
                clearTimeout(t);
                actionCallack(args)
                resolve(true);
            }, delay)
        })
    }

    const movePawn = delay => doAfterDelay(()=>{dispatch(moveOneField(currentPlayer))}, undefined)(delay)
    const wait = delay => doAfterDelay(() => {},)(delay)

    const [cords, setCords] = useState();
    useEffect(async () => {
        if (diceThrown && currentPlayer === props.color) {
            dispatch(disactivateDice());
            for (let diceLeft = diceResult; diceLeft>=0; diceLeft--){
                if (diceLeft > 0) await movePawn(500);
                if(diceLeft === 0) {
                    await wait(500)
                    props.openFieldActionHandler(true);
                }
            }
            // props.openFieldActionHandler(true);
        }
    }, [diceThrown]);

    useEffect(() => {
        if (board.length > 0) {
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
    openFieldActionHandler: PropTypes.func,
}

export default Pawn;