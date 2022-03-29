
import {
  decrement,
  increment,
  incrementStep,
  decrementStep,
  setValue,
  logState,
} from './actions';
import styles from './oldCounter.module.css';
import { connect } from 'react-redux';



const OldCounter = (props) => {

    return (
            <div className="wrapper">
                <button onClick={props.dec}>-</button>
                <input type="number" value = {props.counter} onChange={props.change}></input>
                <button onClick={props.inc}>+</button>
                <button onClick={props.log}>log</button>
            </div>
          )
}

const mapStateToProps = (state, ownProps) => {
    return {
        counter: state.counter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        inc: () => dispatch(increment()),
        dec: () => dispatch(decrement()),
        change: (e) => dispatch(setValue(parseInt(e.target.value))),
        log: () => dispatch(logState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OldCounter);