// Get all cities of the same country,
// get all railways,
// get power plant and water plant
const throwError = (message) => { throw new Error('sameSortGetter: ' + message) };

const getSameCountries = (descriptor, keyToMatch) => {
    const pattern = descriptor[keyToMatch];
    const { country } = pattern;
    const filtered = Object.keys(descriptor).filter(key => descriptor[key].country === country);
    const result = filtered.reduce((acc, key) => {
        acc[key] = descriptor[key];
        return acc;
    }, {})
    return result;
}

const getSameKeyTypes = keyType => (descriptor, keyToMatch) => {
    const pattern = descriptor[keyToMatch];
    const keyTypeValue = pattern[keyType]
    const filtered = Object.keys(descriptor).filter(key => descriptor[key][keyType] === keyTypeValue);
    const result = filtered.reduce((acc, key) => {
        acc[key] = descriptor[key];
        return acc;
    }, {})
    return result;
}

const getRailways = (descriptor, keyToMatch) => {
    return getSameKeyTypes('type')(descriptor,keyToMatch);
}

const getWaterPowerPlants = (descriptor, keyToMatch) => {
    const set = getSameKeyTypes('country')(descriptor, keyToMatch);
    return set;
}

const getSameSetOfSameType = (descriptors, keyToMatch) => {
    if (!descriptors) throwError('descriptors undefined');
    if (!keyToMatch) throwError('keyToMatch not defined');
    if (!descriptors[keyToMatch]) throwError('descriptors[keyToMatch] undefined');
    const pattern = descriptors[keyToMatch];
    
    const type = pattern.type;
    if (!type) throwError('type not known');
    switch(type) {
        case 'city':
            return getSameCountries(descriptors, keyToMatch);
        case 'railway':
            return getRailways(descriptors, keyToMatch);
        case 'powerStation':
            return getWaterPowerPlants(descriptors, keyToMatch);
        case 'waterPlant' :
            return getWaterPowerPlants(descriptors, keyToMatch);
        default: return null;
    }
}

const getTargetPlayerBelongings = (descriptor, playerName) => {
    const keys = Object.keys(descriptor);
    return keys.filter(key => descriptor[key].owner === playerName).reduce((acc, key) => {
        acc[key] = descriptor[key];
        return acc;
    }, {})
}

const getTargetPlayerEstatesNames = (descriptors, playerName) => getTargetPlayerBelongings(descriptors, playerName);

const areAllEstatesSamePlayer = (descriptor, descriptors, player) => {
    const queriedCountry = descriptor.country;
    const owner = descriptor.owner;
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

const doAllBelongToSamePlayer = (descriptors, estateName) => {
    const country = descriptors[estateName].country;
    console.log('country', country)
    const player = descriptors[estateName].owner;
    console.log('player', player)
    const values = Object.values(descriptors);
    console.log('values', values)
    return values.reduce((acc, val) => {
        if ((val.country === country) && (val.owner === player)) return false;
        return true;
    }, true)
}

export { 
    getTargetPlayerBelongings, 
    getSameSetOfSameType, 
    getTargetPlayerEstatesNames,
    areAllEstatesSamePlayer,
    getSameSetEstates,
    doAllBelongToSamePlayer,
};