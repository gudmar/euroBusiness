import useStyles from './flexTableStyle.js'
import PropTypes from 'prop-types';
import {
        headerDescriptors,
        headerOrder,
        getHeaderDescriptors,
        getBody,
    }from './managementPanelDescriptors.js';
import FlexTableHead from './flexTableHead.js'
import { useSelector, useDispatch } from 'react-redux/index.js';
import { useReducer } from 'react/index.js';




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

const getInitialState = (bodyData, headData) => ({
    orderById: headData[0].payload,
    orderDirection: 'asc',
    filter: '',
    originalData: bodyData,
    dataToDisplay: bodyData,
})

const makeReducer = initialState => (state, action) => {
    if (state === undefined) return initialState;
    const toggleOrderDirection = dir => dir === 'asc' ? 'desc' : 'asc';
    switch(action.type) {
        case ('HANDLE_COLUMN_CLICK'):
            if (state.orderById === action.payload) {
                return {
                    ...state,
                    orderDirection: toggleOrderDirection(state.orderDirection),
                }
            }
            return {
                ...state,
                orderById: action.payload
            }
        case ('SEARCH'):
            return {
                ...state,
                filter: action.payload,
                dataToDisplay: searchAll(state.originalData, action.payload)
            }
        default: return state;
    }
}
const action = (type, payload) => ({type:type, payload:payload});
const handleColumnClick = (columnId) => () => dispatch(action('HANDLE_COLUMN_CLICK', columnId));
const handleSearch = filter => dispatch(action('SEARCH', filter))

const FlexTable = (props) => {
    const boardDescriptors = useSelector(store => store.boardSlice);
    const playerDescriptors = useSelector(store => store.playerSlice);
    const headerDescriptors = getHeaderDescriptors(headerOrder);
    const bodyDescriptors = getBody(boardDescriptors, headerOrder);
    const initialLocalState = getInitialState(bodyDescriptors, headerDescriptors);
    const reducer = useReducer();
    const [localState, localDispatch] = useReducer(reducer, initialLocalState);

}

FlexTable.propTypes = {
   headerDescriptors: PropTypes.any,
   bodyDescriptors: PropTypes.any
}