import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import styles from './dicesRoller.module.css';
// import { ThemeProvider, responsiveFontSizes, createTheme } from '@material-ui/core/styles';
import { Typography, ButtonGroup, Button, Box } from '@material-ui/core';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Dice from '../dices/dices.js'
import { setDiceResult, throwDice } from '../../state/playerSlice.js'

// let themeDices = createTheme({
//     typography: {
//         h3: {
//             color: '#345',
//             fontWeight: 'bold',
//             fontSize: '1.3rem',
//             textAlign: 'center'
//         },
//     },

//   });
// themeDices = responsiveFontSizes(themeDices);

const DicesRollerTest = props => {
    const dispatch = useDispatch();
    const rollDices = (a, b) => () => dispatch(throwDice([a, b]));
    const diceResult = useSelector(state => state.playerSlice.diceResult);
    console.log('DicerRollersTest')
    return (
    <Box component = "div">
        <Typography variant="h3">
            {`Chose roll a dice variant. Dice result is ${diceResult}`}
        </Typography>
        <ButtonGroup variant="outlined">
            <Button onClick = {rollDices(1, 1)}><Dice number={1}/><Dice number={1}/></Button>
            <Button onClick = {rollDices(1, 2)}><Dice number={1}/><Dice number={2}/></Button>
            <Button onClick = {rollDices(1, 3)}><Dice number={1}/><Dice number={3}/></Button>
            <Button onClick = {rollDices(1, 4)}><Dice number={1}/><Dice number={4}/></Button>
            <Button onClick = {rollDices(1, 5)}><Dice number={1}/><Dice number={5}/></Button>
            <Button onClick = {rollDices(1, 6)}><Dice number={1}/><Dice number={6}/></Button>
            <Button onClick = {rollDices(2, 6)}><Dice number={2}/><Dice number={6}/></Button>
            <Button onClick = {rollDices(3, 6)}><Dice number={3}/><Dice number={6}/></Button>
            <Button onClick = {rollDices(4, 6)}><Dice number={4}/><Dice number={6}/></Button>
            <Button onClick = {rollDices(5, 6)}><Dice number={5}/><Dice number={6}/></Button>
            <Button onClick = {rollDices(6, 6)}><Dice number={6}/><Dice number={6}/></Button>
        </ButtonGroup>
    </Box>
    )
}

const DicesRoller = props => {
    return <DicesRollerTest></DicesRollerTest>
}

export default DicesRoller;