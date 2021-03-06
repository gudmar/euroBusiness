import PropTypes from 'prop-types';
import { 
    TableHead, 
    TableSortLabel,
    TableRow,
    TableCell,
} from '@material-ui/core';

import useStyles from './flexTableStyle.js'


const headerDataGetter = data => data.payload;

const FlexTableHead =  props => {
    const {orderById, orderDirection, headerDescriptors, changeSortDirection} = props;
    const headers = Object.values(headerDescriptors);
    const classes = useStyles();
    return (
        <TableHead>
            <TableRow>
                {headers.map(cell => {
                    const id = headerDataGetter(cell);
                    return (
                        <TableCell
                            key={id}
                            padding = 'normal'
                            className={classes.header}
                        >
                            <TableSortLabel
                                active={orderById === id} // if sorted by column
                                direction={orderDirection}
                                onClick={changeSortDirection(id)}
                            />
                            {headerDataGetter(cell)}
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    )
}

FlexTableHead.propTypes = {
   headerDescriptors: PropTypes.any.isRequired,
   orderById: PropTypes.string,
   orderDirection: PropTypes.oneOf(['asc', 'desc']),
   changeSortDirection: PropTypes.func
}

export default FlexTableHead;