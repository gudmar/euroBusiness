import styles from './game.module.css';
import { useDispatch, useSelector, useStore } from 'react-redux';
import PropTypes from 'prop-types';
import Board from '../board/board.js'
import Pawn from '../pawn/pawn.js';
import { useEffect, useState } from 'react';
import DicesRoller from '../dicesRoller/dicesRoller.js'
import FieldActionComponent from '../fieldActionComponent/fieldActionComponent.js'
import FieldInformationComponent from '../fieldInformationComponent/fieldInformationComponent.js';
import CurrentPlayerIndicator from '../currentPlayer/currentPlayer.js'
import ManagementPanel from '../ManagementPanel/managementPanel.js'
import { Button } from '@material-ui/core';

const Pawns = props => {
    const players = useSelector(state => state.playerSlice)
    const openFieldActionHandler = props.openFieldActionHandler;
    const pawns = ['blue', 'red', 'green', 'orange'].map(item => 
        !players[item].hidden ? <Pawn key={item} color={item} openFieldActionHandler={openFieldActionHandler} /> : null
    )
    return pawns;
}
const OpenManagementPanelButton = props => {
    const {open, setOpen} = props;
    const openPanel = () => setOpen(true);
    console.log('OpenManagementPalneButton')
    return (
        <Button
            onClick={openPanel}
            >
            Open Management
        </Button>
    )
}

const Game = props => {
    const store = useStore();
    const [fieldActionOpen, setFieldActionOpen] = useState(false);
    const [fieldInformationOpen, setFieldInformationOpen] = useState(false);
    const [currentlyViewedField, setCurrentlyViewedField] = useState(0);
    const [openManagement, setOpenManagement] = useState(false);
    useEffect(() => {console.log(store.getState())})

    return (
        <div className={`${styles.game}`}>
            <FieldActionComponent isOpen = {fieldActionOpen} closeHandler = {() => setFieldActionOpen(false)}/>
            <FieldInformationComponent index = {currentlyViewedField} isOpen = {fieldInformationOpen} closeHandler = {() => setFieldInformationOpen(false)}/>
            <DicesRoller />
            <CurrentPlayerIndicator />
            <OpenManagementPanelButton
                open = {openManagement}
                setOpen = {setOpenManagement}
            />

            <Board fieldHandlers = {{informationOpenHandler: setFieldInformationOpen, setViewedFieldHandler: setCurrentlyViewedField}}/>
            <Pawns openFieldActionHandler = {setFieldActionOpen}/>
            <ManagementPanel open = {openManagement} setOpen = {setOpenManagement}/>
            <Button onClick = {() => {
            }}>{'Log state'}</Button>
        </div>
    )
}

export default Game;