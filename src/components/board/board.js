import PropTypes from 'prop-types';
import styles from './board.module.css'

const Board = (props) => {

    return(
        <div className={styles.board}>
            <div className={ `${styles.fieldBar} ${styles.fieldBarBottom}` }></div>
            <div className={ `${styles.fieldBar} ${styles.fieldBarLeft}` }></div>
            <div className={ `${styles.fieldBar} ${styles.fieldBarTop}` }></div>
            <div className={ `${styles.fieldBar} ${styles.fieldBarRight}` }></div>
            <div className={ `${styles.middleBoard} `}></div>
        </div>
    )
}

Board.propTypes = {
    
}

export default Board;