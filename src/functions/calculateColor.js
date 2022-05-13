
// Calculate color foreground based on background, so there is a readable contrast
// In this case, because there are only 2 colors for the dark foregronud (orange and 
// yellow) there is no need to implement a complicate function

const calculateForegroundBasedOnBackgroundColor = (bgColor) => {
    if (['yellow', 'orange', 'transparent', undefined].includes(bgColor)){
        return 'black'
    }
    return 'white';
}
export default calculateForegroundBasedOnBackgroundColor;