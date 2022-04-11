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

const direction2variant = direction => {
    return parseInt(direction) ===  90 ? 'left' :
           parseInt(direction) === 180 ? 'top'  :
           parseInt(direction) === 270 ? 'right':
           parseInt(direction) ===  0  ? 'bottom':
           parseInt(direction) === 45  ? 'bottom-left':
           parseInt(direction) === 135 ? 'top-left':
           parseInt(direction) === 225  ? 'top-right':
           'bottom-right';
}

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
const isRotated = (descriptor) => {
    return parseInt(descriptor.direction) === 0 ? '' : `${styles.rotated}`
}

const isColumn = variant => variant === 'right' ? false :
                            variant === 'left'  ? false :
                            true;

const cityField = (descriptor, variant, index) => {
    console.log(variant)
    return (
        // <div className = {`${styles.grid} ${styles.column}  ${isRotated(descriptor)}`} style = {{transform: `rotate(${descriptor.direction})`}}>
        <div 
            className = {`${styles.grid} ${isColumn(variant)?styles.column:''} ${styles[variant+'Variant']}`}
            style = {{gridArea: `${index}-slot`}}
        >
            <div className = {'colorBar'} style = {{backgroundColor: descriptor.color}}>
            </div>
            {caption(descriptor)}
            {icon(descriptor)}
            {caption(descriptor)}
        </div>
    )
} 
const gridIconField = (descriptor, variant, index) => {
    return (
        // <div className = {`${styles.grid} ${styles.column} ${isRotated(descriptor)}`} style = {{transform: `rotate(${descriptor.direction})`}}>
        // <div className = {`${styles.grid} ${isColumn(variant)?styles.column:''} ${styles.variant}Variant`}>
        <div 
            className = {`${styles.grid} ${isColumn(variant)?styles.column:''} ${styles[variant+'Variant']}`}
            style = {{gridArea: `${index}-slot`}}
        >        
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

const chanceField = (descriptor, variant, index) => {
    return (
        // <div className = {`${styles.grid} ${styles.column}`}>
        <div 
            className = {`${styles.grid} ${isColumn(variant)?styles.column:''} ${styles[variant+'Variant']}`}
            style = {{gridArea: `${index}-slot`}}
        >        
            <div style={{fontSize: '4rem', color:`${descriptor.color}`}}>?</div>
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

const chanceTypes = ['chanceBlue', 'chanceRed']

// const special = ['chanceBlue', 'chanceRed', 'jail']


const girdTypeSelect = (descriptor, index) => {
    const variant = direction2variant(descriptor.direction);
    console.log(descriptor.direction, variant)
    const type = descriptor.type;
    if (bigIconTypes.includes(type)) return gridIconField(descriptor, variant, index);
    if (bigFieldTypes.includes(type)) return hugeIconField(descriptor, variant, index);
    if (cityTypes.includes(type)) return cityField(descriptor, variant, index);
    if (chanceTypes.includes(type)) return chanceField(descriptor, variant, index);
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
    const index = props.index
    console.log(props)
    console.log(index);
    return (
    <>{girdTypeSelect(props.descriptor, index)}</>
    )
}

Grid.propTypes = {
    direction: PropTypes.string,
    size: PropTypes.oneOf(['narrow', 'wide']),
    descriptor: PropTypes.object,
    index: PropTypes.number
}

export default Grid;