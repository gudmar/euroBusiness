
import { Typography, ButtonGroup, Button, Box, Modal } from '@material-ui/core';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { move, setDiceResult, moveOneField, disactivateDice } from '../../state/playerSlice';
import PropTypes from 'prop-types';
import { boardInOrder, descriptors } from '../../state/boardFields.js'
import styles from './fieldActionComponentStyle.js';



const FieldActionComponent = props => {
    const isOpen = props.isOpen;
    const store = useStore();
    console.log(store.getState())
    const currentPlayer = useSelector(store => store.playerSlice.currentPlayer);
    const getPlayerData = (store, dataName) => store.playerSlice[currentPlayer][dataName];
    const playerName = useSelector(store => getPlayerData(store, 'name'));
    const playerFieldNumber = useSelector(store => getPlayerData(store, 'fieldNumber'));
    const playerCash = useSelector(store => getPlayerData(store, 'cash'));

    const fieldName = boardInOrder[playerFieldNumber]
    const title = fieldName.split('_').join(' ');
    const fieldState = descriptors[fieldName];

    return (
        <Modal 
            open = {isOpen}
            onClose = {props.closeHandler}
        >
            <Box variant="div" style={styles.wrapper}>
                <Typography variant="h4" component="h2">{title}</Typography>
                <Typography variant="h6" component="body1">{fieldState.type}</Typography>
            </Box>
        </Modal>
    )
    
}

FieldActionComponent.propTypes = {
    isOpen: PropTypes.bool,
    closeHandler: PropTypes.func,
}

export default FieldActionComponent;
