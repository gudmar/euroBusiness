import PropTypes from 'prop-types';
import FlexTable from './flexTable.js'
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
} from '@material-ui/core';

const ManagementPanel = props => {
    const { open } = props;
    const boardDescriptors = useSelector(store => store.boardSlice);
    const playerDescriptors = useSelector(store => store.playerSlice);
    const headerDescriptors = getHeaderDescriptors(headerOrder);
    const bodyDescriptors = getBody(boardDescriptors, headerOrder);
    const close = () => open = false;

    return (
        <Dialog 
            fullWidth={true}
            open = {open}
            onClose = {close}
        >
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