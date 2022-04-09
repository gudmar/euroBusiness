import PropTypes from 'prop-types';
import ArrowBack from '@material-ui/icons'
import QuestionMark from '@material-ui/icons';
import LocalParking from '@material-ui/icons';
import DirectionsCar from '@material-ui/icons';
import HouseSiding from '@material-ui/icons';
import Train from '@material-ui/icons';
import LightBulb from '@material-ui/icons';
import Euro from '@material-ui/icons';



const caption = (descriptor) => {
    return (
        <div className = {'caption'}>
            <span>{descriptor.id}</span>
            <span>{descriptor.price}</span>
        </div>
    )
}

const icon = (descriptor) => {
    return (
        <div className = {"iconBlank"}></div>
    )
}

const cityField = (descriptor) => {
    return (
        <div className = {'grid column'}>
            <div className = {'colorBar'} style = {{backgroundColor: descriptor.color}}>
            </div>
            {caption(descriptor)}
            {icon(descriptor)}
            {caption(descriptor)}
        </div>
    )
}
const gridIconField = (descriptor) => {
    return (
        <div className = {'grid column'}>
            {caption(descriptor)}
            {icon(descriptor)}
            {caption(descriptor)}
        </div>
    )    
}

const hugeIconField = (descriptor) => {
    return (
        <div className = {'grid column'}>
            {icon(descriptor)}
        </div>        
    )
}

const bigIconTypes = [
    'powerStation', 'railway', 'waterPlant', 
    'tax', 'guardedPark', 'freePark',
    'go_to_jail'
];

const bigFieldTypes = [
    'start'
]
const cityTypes = ['city']

const special = ['chanceBlue', 'chanceRed', 'jail']

const girdTypeSelect = descriptor => {
    const type = descriptor.type;
    if (bigIconTypes.includes(type)) return gridIconField;
    if (bigFieldTypes.includes(type)) return hugeIconField;
    if (cityTypes.includes(type)) return cityField;
}

const Grid = (props) => {
    const {
        type,
        price,
        owner,
        nrOfHouses,
        isPlaged,
        color,
        width,
        id,
        icon,
    } = props.descriptor
    console.log(props)
    return (
    <>{girdTypeSelect(props.descriptor)}</>
    )
}

Grid.propTypes = {
    direction: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
    size: PropTypes.oneOf(['narrow', 'wide']),
    descriptor: PropTypes.object,
    children: PropTypes.element // any
}

export default Grid;