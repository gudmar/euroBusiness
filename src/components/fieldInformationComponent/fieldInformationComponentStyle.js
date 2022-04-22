import calculateForegroundBasedOnBackgroundColor from '../../functions/calculateColor.js'
const wrapper = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    minHeight: '60%',
    backgroundColor: '#ccc',
    borderRadius: '10px',
    boxShadow: 24,
    padding: '10px',
    textAlign: 'center',
}

const titleEgg = color => ({
    bgColor: color,
    backgroundColor: color === undefined ? 'transparent': color,
    color: calculateForegroundBasedOnBackgroundColor(color),
    // width: '500px',
    paddingLeft: '35px',
    paddingRight: '35px',
    paddingTop: '15px',
    paddingBottom: '15px',
    display: 'inline-block',
    position: 'relative',
    marginLeft: '-100px',
    marginRight: '-100px',
    margin: 'auto',
    borderRadius: '50%',
    marginBottom: '10px',
});

const styles = { wrapper, titleEgg };

export default styles;