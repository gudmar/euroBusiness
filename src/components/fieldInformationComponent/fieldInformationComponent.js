
import { Typography, ButtonGroup, Button, Box, Modal, TableHead, TableContainer } from '@material-ui/core';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { move, setDiceResult, moveOneField, disactivateDice } from '../../state/playerSlice';
import PropTypes from 'prop-types';
import { boardInOrder, descriptors } from '../../state/boardFields.js'
import styles from './fieldInformationComponentStyle.js';
import views from '../../view/board.js';
import calculateForegroundBasedOnBackgroundColor from '../../functions/calculateColor.js'
import * as mdb from 'mdb-ui-kit';
import HouseSharp from '@material-ui/icons/HouseSharp';
import Train from '@material-ui/icons/Train';
import Power from '@material-ui/icons/esm/Power';
import Euro from '@material-ui/icons/Euro';
import Hotel from '@material-ui/icons/Hotel';
import {Table} from '@material-ui/core';
import {TableCell} from '@material-ui/core';
import {TableRow} from '@material-ui/core';
import {TableBody} from '@material-ui/core';


// const getFlag = country => {
//     if ((country === 'Greece') || (country === 'Grecja')) return <i className="flag flag-greece"></i>
//     if ((country === 'Spain') || (country === 'Hiszpania')) return <i className="flag flag-greece"></i>
//     if ((country === 'Italy') || (country === 'Włochy')) return <i className="flag flag-greece"></i>
//     if ((country === 'UK') || (country === 'Wielka brytania')) return <i className="flag flag-greece"></i>
//     if ((name === 'Rotterdam') || (name === 'Amsterdam')) return <i className="flag flag-greece"></i>
// }


const FieldInformationComponent = props => {
    const isOpen = props.isOpen;
    const index = props.index;

    const fieldName = boardInOrder[index]
    const title = fieldName.split('_').join(' ');
    const fieldState = descriptors[fieldName];
    const fieldView = views[fieldName];
    console.log(descriptors, views['Ateny'], fieldName)
    const {
        country,
        hotelPrice,
        housePrice,
        isPlegded,
        nrOfHouses,
        owner,
        price,
        visit,
        mortage,
    } = fieldState;


    const color = calculateForegroundBasedOnBackgroundColor(fieldView.color);
    const bgColor = fieldView.color;
    const darkTitle = {backgroundColor:'black',color:'white', paddingLeft:'10px'};

    const drawTable = tableDescriptor => {
        const headKeys = Object.keys(tableDescriptor.head)
        const singleRow = item => (
            <TableCell>{item}</TableCell>
        )
        console.log(tableDescriptor)
        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headKeys.map(item => <TableCell variant="head" style = {{fontWeight:'bold', textAlign:'center'}}>{item}</TableCell>)}
                        </TableRow>
                    </TableHead>                
                    <TableBody>{
                        tableDescriptor.body.map(row => (
                            <TableRow>{row.map(item => <TableCell style = {{textAlign:'center'}}>{item}</TableCell>)}</TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    const buyTable = {
        head: {
            Price: {
                icon: Euro,
            },
            House: {
                icon: HouseSharp,
            },
            Hotel: {
                icon: Hotel,
            },
        },
        body: [
            [price, housePrice, hotelPrice]
        ]
    };
    const visitTable = {
        head: {
            'No building': {
                icon: undefined,
            },
            'Whole country': {
                icon: undefined,
            },
            '1 x house': {
                icon: HouseSharp,
            },
            '2 x house': {
                icon: HouseSharp,
            },
            '3 x house': {
                icon: HouseSharp,
            },
            '4 x house': {
                icon: HouseSharp,
            },
            'hotel': {
                icon: HouseSharp,
            }
        },
        body: [
            [visit[0], visit[0] * 2, visit[1], visit[2], visit[3], visit[4], visit[5] ],
        ]
    }
    const selling = {
        head: {
            'Sell house': {},
            'Sell hotel': {},
            'Mortage': {},
            'Sell': {},
        },
        body:
            [
                [housePrice/2, hotelPrice/2, mortage, '???']
            ]
    }

    return (
        <Modal 
            open = {isOpen}
            onClose = {props.closeHandler}
        >
            <Box variant="div" style={styles.wrapper}>
                <Typography variant="h4" component="h2">{title}</Typography>
                <Typography 
                    variant="h6" 
                    component="h6"
                    style={{textAlign: 'center', fontStyle: 'italic'}}
                >
                    {country}
                </Typography>

                <Typography variant="h6" style={darkTitle}>Buy</Typography>
                {drawTable(buyTable)}
                <Typography variant="h6" style={darkTitle}>Visit</Typography>
                {drawTable(visitTable)}
                <Typography variant="h6" style={darkTitle}>Selling</Typography>
                {drawTable(selling)}
                <Typography variant="h6" style={darkTitle}>Current state</Typography>


            </Box>
        </Modal>
    )
    
}

FieldInformationComponent.propTypes = {
    isOpen: PropTypes.bool,
    index: PropTypes.number,
    closeHandler: PropTypes.func,
}

export default FieldInformationComponent;