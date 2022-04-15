import PropTypes from 'prop-types';
import styles from './boardSide.module.css';
import Grid from '../grid/grid.js'

const BoardSide = (props) => {
    const direction = props.direction;
    const descriptors = props.descriptors;
    const boardSidePositionNumber = ['Bottom', 'Left', 'Top', 'Right'].findIndex(
        (item) => item === direction
    );
    const calculateFieldNumber = (index) => 
        boardSidePositionNumber < 2 ? 
            (boardSidePositionNumber + 1) * 10 - index :
            boardSidePositionNumber * 10 + index
    
    const sign = boardSidePositionNumber < 20 ? -1 : 1;
    const directionClass = 'fieldBar' + props.direction;
    const boardSide = direction => (
        <div className={ `${styles.fieldBar} ${styles[directionClass]}` }>
            {descriptors.map((descriptor, index) => {
                console.log(index, calculateFieldNumber(index))
                return (
            <Grid 
                descriptor = {descriptor} 
                key = {descriptor.id} 
                index = {index}
                fieldNumber = {calculateFieldNumber(index)}
            />
            )})
        }
        </div>
    )
    return (
        boardSide(direction)
    );
}

BoardSide.propTypes = {
    direction: PropTypes.oneOf(['Bottom', 'Left', 'Right', 'Top']),
    descriptors: PropTypes.array,
}

export default BoardSide;