
import { Typography, ButtonGroup, Button, Box, Modal } from '@material-ui/core';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { move, setDiceResult, moveOneField, disactivateDice } from '../../state/playerSlice';
import PropTypes from 'prop-types';
import { boardInOrder, descriptors } from '../../state/boardFields.js'
import styles from './fieldInformationComponentStyle.js';



const FieldInformationComponent = props => {
    const isOpen = props.isOpen;
    const index = props.index;

    const fieldName = boardInOrder[index]
    const fieldState = descriptors[fieldName];

    return (
        <Modal 
            open = {isOpen}
            onClose = {props.closeHandler}
        >
            <Box variant="div" style={styles.wrapper}>
                <Typography variant="h4" component="h2">{fieldName}</Typography>
                <Typography variant="h6" component="body1">{fieldState.type}</Typography>
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
