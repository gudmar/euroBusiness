import PropTypes from 'prop-types';
import styles from './boardSide.module.css';
import Grid from '../grid/grid.js'

const BoardSide = (props) => {
    const direction = props.direction;
    const descriptors = props.descriptors;
    console.log(descriptors)
    const directionClass = 'fieldBar' + props.direction;
    const boardSide = direction => (
        <div className={ `${styles.fieldBar} ${styles[directionClass]}` }>
            {descriptors.map((descriptor, index) => (
            <Grid descriptor = {descriptor} key = {descriptor.id}/>
            ))}
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