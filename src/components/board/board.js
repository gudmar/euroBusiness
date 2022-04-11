import PropTypes from 'prop-types';
import styles from './board.module.css';
import BoardSide from './boardSide/boardSide.js';
import { boardInOrder, descriptors } from '../../state/boardFields.js';
import boardFieldView from '../../view/board.js'

const boardDescriptorCreator = (stateDescriptor = descriptors, viewDescriptor = boardFieldView, orderArray = boardInOrder) => {
    return orderArray.map((item, index) => {
        return { 
            id: item,
            ...viewDescriptor[item],
            ...stateDescriptor[item],
        }
    });
}

const Board = (props) => {
    const boardDescriptors = boardDescriptorCreator();
    const bottomSliceDescriptor = boardDescriptors.slice(0, 10).reverse();
    const leftSliceDescriptor = boardDescriptors.slice(10, 20).reverse();
    const topSliceDescriptor = boardDescriptors.slice(20, 30);
    const rightSliceDescriptor = boardDescriptors.slice(30, 40)
    console.log(bottomSliceDescriptor)
    return(
        <div className={styles.board}>
            <BoardSide direction="Bottom" descriptors = {bottomSliceDescriptor}></BoardSide>
            <BoardSide direction="Left" descriptors = {leftSliceDescriptor}></BoardSide>
            <BoardSide direction="Top" descriptors = {topSliceDescriptor}></BoardSide>
            <BoardSide direction="Right" descriptors = {rightSliceDescriptor}></BoardSide>
            {/* <div className={ `${styles.fieldBar} ${styles.fieldBarBottom}` }></div>
            <div className={ `${styles.fieldBar} ${styles.fieldBarLeft}` }></div>
            <div className={ `${styles.fieldBar} ${styles.fieldBarTop}` }></div>
            <div className={ `${styles.fieldBar} ${styles.fieldBarRight}` }></div> */}
            <div className={ `${styles.middleBoard} `}></div>
        </div>
    )
}

Board.propTypes = {
    
}

export default Board;