import PropTypes from 'prop-types';
import React from 'react';
// import ArrowBack, { CodeSharp } from '@material-ui/icons'
// import QuestionMark from '@material-ui/icons';
// import LocalParking from '@material-ui/icons';
// import DirectionsCar from '@material-ui/icons';
// import HouseSiding from '@material-ui/icons';
// import { Train } from '@material-ui/icons';
// import LightBulb from '@material-ui/icons';
// import Euro from '@material-ui/icons';
import styles from './grid.module.css';
import { ThemeProvider, responsiveFontSizes, createTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Power from '@material-ui/icons/esm/Power';

let  theme = createTheme({
    typography: {
        body1: {
            color: '#345',
            fontWeight: 'bold',
            fontSize: '0.8rem',
        },
        body2: {
            color: '#234',
            fontSize: '0.85rem',
        }
    },

  });
theme = responsiveFontSizes(theme);

const direction2variant = direction => {
    return parseInt(direction) ===  90 ? 'left' :
           parseInt(direction) === 180 ? 'top'  :
           parseInt(direction) === 270 ? 'right':
           parseInt(direction) ===  0  ? 'bottom':
           parseInt(direction) === 45  ? 'bottomLeft':
           parseInt(direction) === 135 ? 'topLeft':
           parseInt(direction) === 225  ? 'topRight':
           'bottomRight';
}

const caption = (descriptor) => {
    const title = descriptor.id.split('_').join(' ');
    const price = descriptor.price === undefined ? null : '$' + descriptor.price;
    return (
        <div className={styles.column}>
            <ThemeProvider theme={theme}>
                <Typography variant = "body1">{title}</Typography>
                <Typography variant = "body2">{price}</Typography>
            </ThemeProvider>
        </div>
    )
}

const FalseIcon = (prop) => {

    return  eval(prop)
}

const icon = (descriptor) => {
    const MyIcon = descriptor.icon;
    if (descriptor.icon === undefined) return <div className = {"iconBlank"}></div>
    return (
        <div className = {"iconBlank"}>
            <MyIcon />
        </div>
    )
}

const isRotated = (descriptor) => {
    return parseInt(descriptor.direction) === 0 ? '' : `${styles.rotated}`
}

const isColumn = variant => variant === 'right' ? false :
                            variant === 'left'  ? false :
                            true;

const cityField = (descriptor, variant, index) => {
    return (
        // <div className = {`${styles.grid} ${styles.column}  ${isRotated(descriptor)}`} style = {{transform: `rotate(${descriptor.direction})`}}>
        <div 
            className = {`${styles.grid} ${isColumn(variant)?styles.column:''} ${styles[variant+'Variant']}`}
            style = {{gridArea: `${index}-slot`}}
        >
            <div className = {`${styles['colorBar']}`} style = {{backgroundColor: descriptor.color}}>
            </div>
            {caption(descriptor)}
            {icon(descriptor)}
        </div>
    )
} 
const gridIconField = (descriptor, variant, index) => {
    const MyIcon = descriptor.icon;
    const symbol = descriptor.symbol;
    const content = () => descriptor.symbol === undefined ? <MyIcon /> : <span dangerouslySetInnerHTML={{__html: symbol}} />;
    return (
        // <div className = {`${styles.grid} ${styles.column} ${isRotated(descriptor)}`} style = {{transform: `rotate(${descriptor.direction})`}}>
        // <div className = {`${styles.grid} ${isColumn(variant)?styles.column:''} ${styles.variant}Variant`}>
        <div 
            className = {`${styles.grid} ${isColumn(variant)?styles.column:''} ${styles[variant+'Variant']}`}
            style = {{gridArea: `${index}-slot`}}
        >        
            {caption(descriptor)}
            {content()}
        </div>
    )    
}

const hugeField = (descriptor, variant) => {
    const MyIcon = descriptor.icon;
    const symbol = descriptor.symbol;
    const content = () => descriptor.symbol === undefined ? <MyIcon /> : <span dangerouslySetInnerHTML={{__html: symbol}} />;
    // if (descriptor.icon === undefined) return <div className = {"iconBlank"}></div>
    return (
        <div className = {`${styles.gridWide} ${styles.column} ${styles[variant+'Variant']}`}>
            {/* <div style = {{transform: `rotate(${descriptor.direction})`}}> */}
            <div>
                {caption(descriptor)}
                {content()}
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
    if (bigFieldTypes.includes(type)) return hugeField(descriptor, variant, index);
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