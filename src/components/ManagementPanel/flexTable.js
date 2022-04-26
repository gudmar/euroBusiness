import useStyles from './flexTableStyle.js'
import PropTypes from 'prop-types';
import {
        headerDescriptors,
        headerOrder,
        getHeaderDescriptors,
        getBody,
    }from './managementPanelDescriptors.js';




const classes = useStyles;

const sort = (data, fieldId, direction, getData = data => data) => {
    const comparator = dir => (aData, bData) => {
        const a = getData(aData[fieldId]);
        const b = getData(bData[fieldId]);
        if (a === b) return 0;
        if (dir === 'asc') {
            if (a > b) return 1;
            return -1;    
        }
        if (a > b) return -1;
        return 1;
    }
    return data.sort(comparator(direction))
}

const search = (data, fieldId, stringTemplate, getData = data => data) => {
    const found = item => getData(item[fieldId]) === stringTemplate;
    return data.filter(found);
}

const searchAll = (data, stringTemplate, getData) => {
    if (!Array.isArray(data)) return [];
    if (data.length === 0) return [];
    const keys = Object.keys(data[0]);
    let result = data;
    for(let key of keys) {
        result = search(result, key, stringTemplate, getData);
    }
    return result;
}

const FlexTable = (props) => {


}

FlexTable.propTypes = {
   headerDescriptors: PropTypes.any,
   bodyDescriptors: PropTypes.any
}