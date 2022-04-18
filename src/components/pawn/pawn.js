import styles from './pawn.module.css';
import { useDispatch, useSelector, useStore } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';

const Pawn = props => {
    const player = useSelector(state => state.playerSlice[props.color]);
    const board = useSelector(state => state.boardSlice)
    const fieldNumber = useSelector(state => state.playerSlice[props.color].fieldNumber);
    const store = useStore();
    const pawn = useRef();
    // console.log(store.getState().playerSlice[props.color].fieldNumber)
    // console.log(props.color)
    const getMiddleCords = (fieldNr) => {
        // console.log(board)
        // console.log(fieldNr)
        try {
            const { left, right, top, bottom } = board.fieldDescriptors[fieldNr];
            const average = (a, b) => (a + b) / 2;
            return {x: average(left, right), y: average(top, bottom)}
        }
        catch(e){
            return {x: -30, y: -30}
        }
    }
    const placePawn = cords => {
        console.log(pawn)
        try {
            const {width, height} = pawn.current.getBoundingClientRect();
            if (props.color === 'orange') return {
                x: cords.x - width,
                y: cords.y - height,
            };
            if (props.color === 'red') return {
                x: cords.x + width,
                y: cords.y - height
            }
            if (props.color === 'green') return {
                x: cords.x - width,
                y: cords.y + height
            }
            return {
                x: cords.x + width,
                y: cords.y + height
            }
        } catch (error) {
            return {
                x: -50, y: -50
            }
        }
    }
    const substrPawnOffset = cords => {
        const {width, height} = pawn.current.getBoundingClientRect();
        return {
            x: cords.x - width/2,
            y: cords.y - height/2
        }
    }
    const [cords, setCords] = useState();
    useEffect(() => {
        if (board.fieldDescriptors.length > 0) {
            setCords(getMiddleCords(fieldNumber))
            console.log(getMiddleCords(0))
        }
        // console.log(fieldNumber)
    }, [fieldNumber]);
    // useEffect(() => {
    //     console.log('board', board)
    // }, [board])
    // useEffect(() => {console.log(board)});
    return (
        <div 
            ref = {pawn}
            className={`${styles.pawn}`} 
            style={
                {
                    backgroundColor: props.color, 
                    left: placePawn(getMiddleCords(fieldNumber).x), 
                    top: placePawn(getMiddleCords(fieldNumber).y)
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