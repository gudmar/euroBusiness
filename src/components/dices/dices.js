import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import styles from './dices.module.css';
import { ThemeProvider, responsiveFontSizes, createTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector, useStore } from 'react-redux';


const Dot = (props) => {
    return <div className={`${styles.diceDot}`} style={{gridArea: `${props.area}`}}></div>
}

Dot.propTypes = {
    area: PropTypes.string,
}

const DiceWrapper = props => {

    return (
        <div className = {`${styles.diceCube}`}>
            <div className = {`${styles.diceCircle}`}>
                <div className = {`${styles.dotWrapper}`}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
DiceWrapper.propTypes = {
    children: PropTypes.any,
}

const Dice = props => {

    const diceWrapper = children => (
        <div className = {`${styles.diceCube}`}>
            <div className = {`${styles.diceCircle}`}>
                <div className = {`${styles.dotWrapper}`}>
                    {children}
                </div>
            </div>
        </div>
    )
    const dice1 = () => (
            <DiceWrapper>
                <Dot area = 'a5' />
            </DiceWrapper>
    )
    const dice2 = () => (
        <DiceWrapper>
            <Dot area = 'a1' />
            <Dot area = 'a9' />
        </DiceWrapper>
    )
    const dice3 = () => (
        <DiceWrapper>
            <Dot area = 'a1' />
            <Dot area = 'a5' />
            <Dot area = 'a9' />
        </DiceWrapper>
    )
    const dice4 = () => (
        <DiceWrapper>
            <Dot area = 'a1' />
            <Dot area = 'a3' />
            <Dot area = 'a7' />
            <Dot area = 'a9' />
        </DiceWrapper>
    )
    const dice5 = () => (
        <DiceWrapper>
            <Dot area = 'a1' />
            <Dot area = 'a3' />
            <Dot area = 'a5' />
            <Dot area = 'a7' />
            <Dot area = 'a9' />
        </DiceWrapper>
    )
    const dice6 = () => (
        <DiceWrapper>
            <Dot area = 'a1' />
            <Dot area = 'a3' />
            <Dot area = 'a4' />
            <Dot area = 'a6' />
            <Dot area = 'a7' />
            <Dot area = 'a9' />
        </DiceWrapper>
    )
    
    if (props.number === 1) return dice1();
    if (props.number === 2) return dice2();
    if (props.number === 3) return dice3();
    if (props.number === 4) return dice4();
    if (props.number === 5) return dice5();
    return dice6();
}

Dice.propTypes = {
    number: PropTypes.number,
}

export default Dice;