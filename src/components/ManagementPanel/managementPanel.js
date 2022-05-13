import PropTypes from 'prop-types';
import FlexTable from './flexTable.js';
import React, { useState } from 'react';
import {
    headerDescriptors,
    headerOrder,
    getHeaderDescriptors,
    getBody,
} from './managementPanelDescriptors.js';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { 
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Box,
} from '@material-ui/core';
import useStyles from './managementPanelStyles.js';

const ManagementPanel = props => {
    // const { open, setOpen } = useState(props.open);
    const {open, setOpen} = props;
    const boardDescriptors = useSelector(store => store.boardSlice);
    const playerDescriptors = useSelector(store => store.playerSlice);
    const headerDescriptors = getHeaderDescriptors(headerOrder);
    const bodyDescriptors = getBody(boardDescriptors, headerOrder);
    const classes = useStyles();
    const close = () => setOpen(false);
    return (
        <Dialog 
            fullWidth={true}
            open = {open}
            onClose = {close}
        >
        <Box className={classes.headSection}>
            <span className={classes.title}>Management panel</span>
        </Box>
        
            <DialogContent>
                <FlexTable
                    headerDescriptors={headerDescriptors}
                    bodyDescriptors={bodyDescriptors}
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="contained"
                    onClick = {close}
                >
                    cancel
                </Button>
                <Button 
                    variant="contained"
                >
                    Ok
                </Button>                
            </DialogActions>
        </Dialog>
    )

}

ManagementPanel.propTypes = {
    open: PropTypes.bool,
}

export default ManagementPanel;