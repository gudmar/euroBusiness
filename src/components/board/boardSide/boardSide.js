import PropTypes from 'prop-types';
import styles from './boardSide.module.css';
import Grid from '../grid/grid.js'

const BoardSide = (props) => {
    const direction = props.direction;
    const { informationOpenHandler, setViewedFieldHandler } = props.fieldHandlers;
    const openInformationHandler = (fieldNumber) => () => {
        setViewedFieldHandler(fieldNumber);
        informationOpenHandler(true);
    }
    const descriptors = props.descriptors;
    const boardSidePositionNumber = ['Bottom', 'Left', 'Top', 'Right'].findIndex(
        (item) => item === direction
    );
    const calculateFieldNumber = (index) => 
        boardSidePositionNumber < 2 ? 
            (boardSidePositionNumber + 1) * 10 - (index + 1) :
            boardSidePositionNumber * 10 + index
    
    const sign = boardSidePositionNumber < 20 ? -1 : 1;
    // if (direction === 'Top') debugger;
    const directionClass = 'fieldBar' + props.direction;
    const boardSide = direction => (
        <div className={ `${styles.fieldBar} ${styles[directionClass]}` }>
            {descriptors.map((descriptor, index) => {
                // if (direction === "Top") debugger;
            console.log(
                    <Grid 
                descriptor = {descriptor} 
                key = {descriptor.id} 
                index = {index}
                openInformationHandler = {openInformationHandler(calculateFieldNumber(index))}
                fieldNumber = {calculateFieldNumber(index)}   
                
                direction = {direction } // DEBUGGING
            />
                )
            return <Grid 
                descriptor = {descriptor} 
                key = {descriptor.id} 
                index = {index}
                openInformationHandler = {openInformationHandler(calculateFieldNumber(index))}
                fieldNumber = {calculateFieldNumber(index)}   
                
                direction = {direction } // DEBUGGING
            />
            }
            )}
        </div>
    )
    return (
        boardSide(direction)
    );
}

BoardSide.propTypes = {
    direction: PropTypes.oneOf(['Bottom', 'Left', 'Right', 'Top']),
    descriptors: PropTypes.array,
    fieldHandlers: PropTypes.any,
}

export default BoardSide;