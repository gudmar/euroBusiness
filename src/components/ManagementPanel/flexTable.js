import useStyles from './flexTableStyle.js'
import PropTypes from 'prop-types';
// import {
//         headerDescriptors,
//         headerOrder,
//         getHeaderDescriptors,
//         getBody,
//     }from './managementPanelDescriptors.js';
import FlexTableHead from './flexTableHead.js'
// import { useSelector, useDispatch } from 'react-redux/index.js';
import { useReducer } from 'react/index.js';
import { TableContainer, TableBody, TableRow, TableCell } from '@material-ui/core';




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

const getInitialState = (bodyData, headData) => {
    console.log(headData);
    return {
    orderById: Object.values(headData).payload,
    orderDirection: 'asc',
    filter: '',
    originalData: bodyData,
    dataToDisplay: bodyData,
}
}

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

const FlexTable = (props) => {
    // const boardDescriptors = useSelector(store => store.boardSlice);
    // const playerDescriptors = useSelector(store => store.playerSlice);
    // const headerDescriptors = getHeaderDescriptors(headerOrder);
    // const bodyDescriptors = getBody(boardDescriptors, headerOrder);
    const {bodyDescriptors, headerDescriptors} = props;
    const initialLocalState = getInitialState(bodyDescriptors, headerDescriptors);
    const reducer = useReducer();
    const [localState, localDispatch] = useReducer(reducer, initialLocalState);
    const handleColumnClick = (columnId) => () => localDispatch(action('HANDLE_COLUMN_CLICK', columnId));
    const handleSearch = filter => localDispatch(action('SEARCH', filter))


    return (
        <TableContainer>
            <FlexTableHead 
                headerDescriptors={headerDescriptors}
                orderById={localState.orderById}
                orderDirection={localState.orderDirection}
                changeSortDirection={handleColumnClick}
            />
            <TableBody>
                {
                    bodyDescriptors.map(row => {
                        const cells = Object.values(row);
                        return (
                            <TableRow>
                                {
                                    cells.map(cell => (
                                        <TableCell>
                                            {cell}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </TableContainer>
    )
}

FlexTable.propTypes = {
   headerDescriptors: PropTypes.any.isRequired,
   bodyDescriptors: PropTypes.any.isRequired
}

export default FlexTable;