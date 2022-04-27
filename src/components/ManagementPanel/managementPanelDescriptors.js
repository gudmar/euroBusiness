import { getTargetPlayerEstatesNames } from '../../functions/sameSortGetter.js'

const headerDescriptors = {
    country: {
        type: 'text',
        payload: 'Set',
    },
    city: {
        type: 'text',
        payload: 'Name',
    },        
    visit: {
        type: 'text',
        payload: 'Visit'
    },
    owner: {
        type: 'text',
        payload: 'Owner'
    },        
    isPlagded: {
        type: 'text',
        payload: 'is plagded'
    },        
    nrOfHouses: {
        type: 'text',
        payload: 'Houses'
    }
}

const headerOrder = ['country', 'city', 'visit', 'owner'];

const getHeaderDescriptors = (orderArray) => {
    const result = {};
    orderArray.forEach(item => {
        result[item] = headerDescriptors[item]
    })
    return result;
};

const powerWaterPlant = ['powerStation', 'waterPlant'];
const railway = ['railway'];
const city = ['city'];
const estate = [...powerWaterPlant, ...railway, ...city];
const convertName = name => {
    return name.split('_').join(' ');
}

const descriptorReducer = (key, descriptor, fieldName, descriptors) => {
    switch (key) {
        case 'country': 
            if (key in railway) return 'Railway';
            if (key in city) return descriptor.country;
            if (key in powerWaterPlant) return 'Plant';
        case 'city': 
            return convertName(fieldName);
        case 'visit': 
            const player = descriptor.player;
            const playersEstates = getTargetPlayerEstatesNames(descriptors, player);
            return playersEstates;
        case 'owner':
            return descriptor.owner;
        case 'isPlagded':
            return descriptor.isPlagded;
        case 'nrOfHouses':
            if (descriptor.nrOfHouses === undefined) return '-';
            if (descriptor.nrOfHouses < 5) return descriptor.nrOfHouses;
            if (descriptor.nrOfHouses === 5) return '1 hotel';
        default: return null;
    }
}


const getBodyDescriptor = (descriptors, descriptor, template, fieldName) => {
    //template => headerOrder
    // descriptors => boardFields
    // descriptors for calculating visit price
    const result = {};
    const keys = Object.keys(template);
    keys.forEach(key => {
        result[key] = descriptorReducer(key, descriptor, fieldName, descriptors)
    })
}

const getBody = (descriptors, template) => {
    const result = [];
    const values = Object.values(descriptors);
    values.forEach(item => {
        if (item.type in estate) {
            result.push(getBodyDescriptor(item));
        }
    })
    return result;
}



export { 
    headerDescriptors, 
    headerOrder, 
    getHeaderDescriptors, 
    estate, 
    convertName, 
    descriptorReducer, 
    getBody
}