import { makeStyles } from "@material-ui/core/styles";
// import { fontFamily, fontWeight } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
    headSection: {
        display: 'grid',
        gridTemplateRows: '10fr 2fr',
        justifyContent:'center',
    },
    title: {
        fontSize: '1.5rem',
        marginTop: '1rem',
        color: '#aaa',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontWeight: 'bold',
        alignText: 'center',
    },

}))

export default useStyles;