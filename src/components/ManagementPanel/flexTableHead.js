import PropTypes from 'prop-types';
import { 
    TableHead, 
    TableSortLabel,
    TableRow,
    TableCell,
} from '@material-ui/core';


const headerDataGetter = data => data.payload;

const FlexTableHead =  props => {
    const {orderById, orderDirection, headerDescriptors, changeSortDirection} = props;

    return (
        <TableHead>
            <TableRow>
                {headerDescriptors.map(cell => {
                    id = headerDataGetter(cell);
                    return (
                        <TableCell
                            key={id}
                            padding = 'normal'
                            sortDriection={orderById === id ? orderDirection : false} // or false when off, or desc
                        >
                            <TableSortLabel
                                active={orderById === id} // if sorted by column
                                direction={orderDirection}
                                onClick={changeSortDirection(id)}
                            />
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    )
}

FlexTableHead.propTypes = {
   headerDescriptors: PropTypes.any,
   orderById = PropTypes.string,
   orderDirection = PropTypes.oneOf(['asc', 'desc']),
   changeSortDirection = PropTypes.func
}

export default FlexTableHead;