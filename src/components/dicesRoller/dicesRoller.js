import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import styles from './dicesRoller.module.css';
// import { ThemeProvider, responsiveFontSizes, createTheme } from '@material-ui/core/styles';
import { Typography, ButtonGroup, Button, Box } from '@material-ui/core';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Dice from '../dices/dices.js'

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
    return (
    <Box component = "div">
        <Typography variant="h3">
            {"Chose roll a dice variant"}
        </Typography>
        <ButtonGroup variant="outlined">
            <Button><Dice number={1}/><Dice number={1}/></Button>
            <Button><Dice number={1}/><Dice number={2}/></Button>
            <Button><Dice number={1}/><Dice number={3}/></Button>
            <Button><Dice number={1}/><Dice number={4}/></Button>
            <Button><Dice number={1}/><Dice number={5}/></Button>
            <Button><Dice number={1}/><Dice number={6}/></Button>
            <Button><Dice number={2}/><Dice number={6}/></Button>
            <Button><Dice number={3}/><Dice number={6}/></Button>
            <Button><Dice number={4}/><Dice number={6}/></Button>
            <Button><Dice number={5}/><Dice number={6}/></Button>
            <Button><Dice number={6}/><Dice number={6}/></Button>
        </ButtonGroup>
    </Box>
    )
}

const DicesRoller = props => {
    return <DicesRollerTest></DicesRollerTest>
}

export default DicesRoller;