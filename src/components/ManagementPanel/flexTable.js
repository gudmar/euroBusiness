import useStyles from './flexTableStyle.js'
import PropTypes from 'prop-types';
import {
        headerDescriptors,
        headerOrder,
        getHeaderDescriptors,
        getBodyDescriptor,
    }from './managementPanelDescriptors.js';



const classes = useStyles;

const FlexTable = (props) => {

}

FlexTable.propTypes = {
   headerDescriptors: PropTypes.any,
   bodyDescriptors: PropTypes.any
}