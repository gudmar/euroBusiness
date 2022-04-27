import PropTypes from 'prop-types';
import styles from './board.module.css';
import BoardSide from './boardSide/boardSide.js';
import { boardInOrder, descriptors } from '../../state/boardFields.js';
import boardFieldView from '../../view/board.js';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useEffect } from 'react';

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
    const gridCords = useSelector(state => state.fieldDescriptors);
    const state = useStore();
    console.log('Board')
    useEffect(() => {console.log(state.getState())})
    // useEffect((gridCords) => {
    //     console.dir(gridCords)
    // }, [gridCords])
    // console.log(bottomSliceDescriptor)
    return(
        <div className={styles.board}>
            <BoardSide direction="Bottom" descriptors = {bottomSliceDescriptor} fieldHandlers={props.fieldHandlers}></BoardSide>
            <BoardSide direction="Left" descriptors = {leftSliceDescriptor} fieldHandlers={props.fieldHandlers}></BoardSide>
            <BoardSide direction="Top" descriptors = {topSliceDescriptor} fieldHandlers={props.fieldHandlers}></BoardSide>
            <BoardSide direction="Right" descriptors = {rightSliceDescriptor} fieldHandlers={props.fieldHandlers}></BoardSide>
            {/* <div className={ `${styles.fieldBar} ${styles.fieldBarBottom}` }></div>
            <div className={ `${styles.fieldBar} ${styles.fieldBarLeft}` }></div>
            <div className={ `${styles.fieldBar} ${styles.fieldBarTop}` }></div>
            <div className={ `${styles.fieldBar} ${styles.fieldBarRight}` }></div> */}
            <div className={ `${styles.middleBoard} `}></div>
        </div>
    )
}

Board.propTypes = {
    fieldHandlers: PropTypes.any,    
}

export default Board;