import PropTypes from 'prop-types';
import ArrowBack from '@material-ui/icons'
import QuestionMark from '@material-ui/icons';
import LocalParking from '@material-ui/icons';
import DirectionsCar from '@material-ui/icons';
import HouseSiding from '@material-ui/icons';
import Train from '@material-ui/icons';
import LightBulb from '@material-ui/icons';
import Euro from '@material-ui/icons';
import styles from './grid.module.css';



const caption = (descriptor) => {
    const title = descriptor.id.split('_').join(' ');
    return (
        <div className = {'caption'}>
            <div className={`${styles.wrapText}`}>{title}</div>
            <div>{descriptor.price}</div>
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
        // <div className = {`${styles.grid} ${styles.column}`} style = {{transform: `rotate(${descriptor.direction})`}}>
        <div className = {`${styles.grid} ${styles.column}`}>
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
        // <div className = {`${styles.grid} ${styles.column}`} style = {{transform: `rotate(${descriptor.direction})`}}>
        <div className = {`${styles.grid} ${styles.column}`}>
            {caption(descriptor)}
            {icon(descriptor)}
            {caption(descriptor)}
        </div>
    )    
}

const hugeIconField = (descriptor) => {
    return (
        <div className = {`${styles.gridWide} ${styles.column}`}>
            <div style = {{transform: `rotate(${descriptor.direction})`}}>
                {caption(descriptor)}
                    {icon(descriptor)}
                {caption(descriptor)}
            </div>
        </div>        
    )
}

const bigIconTypes = [
    'powerStation', 'railway', 'waterPlant', 
    'tax', 'guardedPark', 
];

const bigFieldTypes = [
    'start','freePark',
    'go_to_jail', 'jail'
]
const cityTypes = ['city']

const special = ['chanceBlue', 'chanceRed', 'jail']

const girdTypeSelect = descriptor => {
    const type = descriptor.type;
    if (bigIconTypes.includes(type)) return gridIconField(descriptor);
    if (bigFieldTypes.includes(type)) return hugeIconField(descriptor);
    if (cityTypes.includes(type)) return cityField(descriptor);
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