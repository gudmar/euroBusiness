import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import styles from './grid.module.css';
import { ThemeProvider, responsiveFontSizes, createTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Power from '@material-ui/icons/esm/Power';
import { useDispatch, useSelector, useStore } from 'react-redux';
// import { addField, print, updatePosition } from '../../../state/boardSlice.js'
import { addField, print, updatePosition } from '../../../state/boardActions.js';

let  theme = createTheme({
    typography: {
        h3: {
            color: '#345',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textAlign: 'center'
        },
        body1: {
            color: '#345',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            textAlign: 'center'
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

const cityField = (descriptor, openInfoHandler, variant, index, ref) => {
    return (
        // <div className = {`${styles.grid} ${styles.column}  ${isRotated(descriptor)}`} style = {{transform: `rotate(${descriptor.direction})`}}>
        <div 
            className = {`${styles.grid} ${isColumn(variant)?styles.column:''} ${styles[variant+'Variant']}`}
            style = {{gridArea: `${index}-slot`}}
            ref = {ref}
            onClick = {openInfoHandler}
        >
            <div className = {`${styles['colorBar']}`} style = {{backgroundColor: descriptor.color}}>
            </div>
            {caption(descriptor)}
            {icon(descriptor)}
        </div>
    )
} 
const gridIconField = (descriptor, openInfoHandler, variant, index, ref) => {
    const MyIcon = descriptor.icon;
    const symbol = descriptor.symbol;
    
    const content = () => descriptor.symbol === undefined ? <MyIcon style = {{fontSize: 50}}/> : <span className={`${styles.symbolIcon}`} dangerouslySetInnerHTML={{__html: symbol}} />;
    return (
        // <div className = {`${styles.grid} ${styles.column} ${isRotated(descriptor)}`} style = {{transform: `rotate(${descriptor.direction})`}}>
        // <div className = {`${styles.grid} ${isColumn(variant)?styles.column:''} ${styles.variant}Variant`}>
        <div 
            className = {`${styles.grid} ${isColumn(variant)?styles.column:''} ${styles[variant+'Variant']} ${styles.iconField}`}
            style = {{gridArea: `${index}-slot`}}
            ref = {ref}
            onClick = {openInfoHandler}
        >        
            {caption(descriptor)}
            {content()}
        </div>
    )    
}

const hugeField = (descriptor, openInfoHandler, variant, index, ref) => {
    const MyIcon = descriptor.icon;
    const symbol = descriptor.symbol;
    const content = () => descriptor.symbol === undefined ? <MyIcon style = {{fontSize: 50}}/> : <span className={`${styles.symbolIcon}`} dangerouslySetInnerHTML={{__html: symbol}} />;
    // if (descriptor.icon === undefined) return <div className = {"iconBlank"}></div>
    return (
        <div 
            className = {`${styles.gridWide} ${styles.column} ${styles[variant+'Variant']}`} 
            ref = {ref}
            onClick = {openInfoHandler}
        >
                {caption(descriptor)}
                {content()}
                <div></div>
        </div>        
    )
}

const chanceField = (descriptor, openInfoHandler, variant, index, ref) => {
    return (
        // <div className = {`${styles.grid} ${styles.column}`}>
        <div 
            className = {`${styles.grid} ${isColumn(variant)?styles.column:''} ${styles[variant+'Variant']} ${styles.chance}`}
            style = {{gridArea: `${index}-slot`}}
            ref = {ref}
            onClick = {openInfoHandler}
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


const girdTypeSelect = (descriptor, openInfoHandler, index, ref) => {
    const variant = direction2variant(descriptor.direction);
    const type = descriptor.type;
    if (bigIconTypes.includes(type)) return gridIconField(descriptor, openInfoHandler, variant, index, ref);
    if (bigFieldTypes.includes(type)) return hugeField(descriptor, openInfoHandler, variant, index, ref);
    if (cityTypes.includes(type)) return cityField(descriptor, openInfoHandler, variant, index, ref);
    if (chanceTypes.includes(type)) return chanceField(descriptor, openInfoHandler, variant, index, ref);
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
    const index = props.index;
    const fieldNumber = props.fieldNumber;
    const elRef = useRef();
    const state = useStore();


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addField({ ...props.descriptor, index: fieldNumber}));
    }, [])
    useEffect(() => {
        if (elRef.current !== undefined) {
            const { left, right, top, bottom } = elRef.current.getBoundingClientRect();
            dispatch(updatePosition({left, right, top, bottom, index:fieldNumber}));
        }        
    })

    return (            
               girdTypeSelect(props.descriptor, props.openInformationHandler, index, elRef)
            )
}

Grid.propTypes = {
    direction: PropTypes.string,
    size: PropTypes.oneOf(['narrow', 'wide']),
    descriptor: PropTypes.object,
    index: PropTypes.number,
    fieldNumber: PropTypes.number,
    openInformationHandler: PropTypes.func,
}

export default Grid;