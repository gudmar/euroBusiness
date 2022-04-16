import styles from './pawn.module.css';
import { useDispatch, useSelector, useStore } from 'react-redux';
import PropTypes from 'prop-types';

const Pawn = props => {
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
    fieldNumber: PropTypes.number.isRequired,
}

export default Pawn;