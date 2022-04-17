import styles from './pawn.module.css';
import { useDispatch, useSelector, useStore } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Pawn = props => {
    const player = useSelector(state => state.playerSlice[props.color]);
    const board = useSelector(state => state.boardSlice)
    const fieldNumber = useSelector(state => state.playerSlice[props.color].fieldNumber);
    const getMiddleCords = (fieldNr) => {
        console.log(board)
        const { left, right, top, bottom } = board.fieldDescriptors[fieldNr];
        const average = (a, b) => (a + b) / 2;
        return {x: average(left, right), y: average(top, bottom)}
    }
    const [cords, setCords] = useState();
    useEffect((fieldNumber) => {
        if (board.fieldDescriptors.length > 0) {
            setCords(getMiddleCords(fieldNumber))
        }
    }, [fieldNumber]);
    useEffect(() => {console.log(board)});
    return (
        <div 
            className={`${styles.pawn}`} 
            style={{backgroundColor: props.color}}
        >
        </div>
    )
}

Pawn.propTypes = {
    color: PropTypes.string.isRequired,
    fieldNumber: PropTypes.number,
}

export default Pawn;