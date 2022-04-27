import { getTargetPlayerEstatesNames } from '../../functions/sameSortGetter.js'
import { getNrOfCitiesPlayerHas, countVisitFeeChecker } from '../../state/boardFields.js'

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
    // console.log(key, descriptor, fieldName, descriptors)
    const type = descriptor.type;
    switch (key) {
        case 'country': 
            if (railway.includes(type)) return 'Railway';
            if (city.includes(type)) return descriptor.country;
            if (powerWaterPlant.includes(type)) return 'Plant';
        case 'city': 
            return convertName(fieldName);
        case 'visit': 
            const player = descriptor.owner;
            const playersEstates = getTargetPlayerEstatesNames(descriptors, player);
            const rate = getNrOfCitiesPlayerHas(descriptors, player, descriptor.country);
            const fee = countVisitFeeChecker(descriptor)
            debugger
            return fee;
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
    // console.log(descriptors, descriptor, template, fieldName)
    const result = {};
    const keys = Object.keys(template);
    template.forEach(key => {
        result[key] = descriptorReducer(key, descriptor, fieldName, descriptors)
    })
    return result;
}

const getBody = (descriptors, template) => {
    const result = [];
    descriptors.forEach(item => {
        if (estate.includes(item.type)) {
            result.push(getBodyDescriptor(descriptors, item, template, item.id));
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