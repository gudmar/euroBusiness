// import PropTypes from 'prop-types';
import styles from './currentPlayer.module.css';
import { nextPlayer } from '../../state/playerSlice.js'
// import BoardSide from './boardSide/boardSide.js';
// import { boardInOrder, descriptors } from '../../state/boardFields.js';
// import boardFieldView from '../../view/board.js';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useEffect } from 'react';
import { Typography } from '@material-ui/core';

const CurrentPlayerIndicator = props => {
    const color = useSelector(state => state.playerSlice.currentPlayer);
    const dispatch = useDispatch();
    const switchPlayer = () => dispatch(nextPlayer());
    console.log('CurrentPlayerIndicator')

    return (
        <div className={styles.wrapper}>
            <Typography variant="body1">
                {'Currently: '}
            </Typography>
            <div 
                className={styles.color} 
                style={{backgroundColor: color}}
                onClick={switchPlayer}
            >
            </div>
        </div>
    )
}

export default CurrentPlayerIndicator;

// CurrentPlayerIndicator.propTypes = {
//     color: PropTypes.oneOf(['blue','red', 'orange','green']),
// }
