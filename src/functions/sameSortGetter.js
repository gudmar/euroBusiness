// Get all cities of the same country,
// get all railways,
// get power plant and water plant
const throwError = (message) => { throw new Error('sameSortGetter: ' + message) };
const getSameCities = (descriptors, keyToMatch) => {
    const pattern = descriptors[keyToMatch];
    const { country } = pattern;
    return descriptors.filter(item => item.country === country)
}
const getRailways = descriptors => descriptors.filter(item => item.type === 'railway');
const getWaterPowerPlants = descriptors => descriptors.filter(item => ['powerStation', 'waterPlant'].includes(item.type))
const getSameTypes = (descriptors, keyToMatch) => {
    if (!descriptors) throwError('descriptors undefined');
    if (!keyToMatch) throwError('keyToMatch not defined');
    if (descriptors[keyToMatch]) throwError('descriptors[keyToMatch] undefined');
    const pattern = descriptors[keyToMatch];
    const type = pattern.type;
    if (!type) throwError('type not known');
    switch(type) {
        case 'city':
            return getSameCities(descriptors, keyToMatch);
        case 'railway':
            return getRailways(descriptors);
        case 'powerStation':
            return getWaterPowerPlants(descriptors);
        case 'waterPlant' :
            return getWaterPowerPlants(descriptors);
        default: return null;
    }
}

const getTargetPlayerBelongings = (descriptors, playerName) => {
    return descriptors.filter(item => item.owner === playerName);
}

const getTargetPlayerEstatesNames = (descriptors, playerName) => getTargetPlayerBelongings(descriptors, playerName);

const areAllEstatesSamePlayer = (descriptor, descriptors, player) => {
    const queriedCountry = descriptor.country;
    const owner = descriptor.owner;
    console.log('ARE ALL ESTATES SAME ...', descriptor)
    if (owner === undefined || queriedCountry === undefined) return false;
    if (owner === 'bank') return false;
    return Object.values(descriptors).reduce((acc, item) => {
        if (acc === false) return false;
        if (item.country === queriedCountry){
            if (item.owner === owner) return true;
            return false;
        }
        return acc;
    }, true)
}

const getSameSetEstates = (descriptors, estateCountry) => {
    const keys = Object.keys(descriptors);
    return keys.reduce((acc, key) => {
        if (descriptors[key] === estateCountry) Object.assign(acc, descriptors[key]);
    }, {})
}

const doAllBelongToSamePleyer = (descriptors, estateName) => {
    const country = descriptors[estateName].country;
    const player = descriptors[estateName].owner;
    const values = Object.values(descriptors);
    return values.reduce((acc, val) => {
        if (val.country !== country) return false;
        return true;
    }, true)
}

export { 
    getTargetPlayerBelongings, 
    getSameTypes, 
    getTargetPlayerEstatesNames,
    areAllEstatesSamePlayer,
    getSameSetEstates,
    doAllBelongToSamePleyer,
};