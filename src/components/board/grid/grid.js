import PropTypes from 'prop-types';

const Grid = (props) => {

}

Grid.propTypes = {
    direction: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
    size: PropTypes.oneOf(['narrow', 'wide']),
    children: PropTypes.element // any
}