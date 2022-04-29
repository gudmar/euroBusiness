import  {
    areAllEstatesSamePlayer,
    getSameSetOfSameType,
}  from '../sameSortGetter.js';


const testSet1 = {
    Ateny: {
        country: 'Greece',
        owner: 'Bolek',
        type: 'city',

    },
    Saloniki: {
        country:'Greece',
        owner: 'Bolek',
        type: 'city',
    },
    Antarktyda: {
        country: 'None',
        owner: undefined,
        type: 'city',
    },
    Arktyka: {
        country: 'None',
        owner: undefined,
        type: 'city',
    },
    Madryt: {
        country: 'Spain',
        owner: 'Lolek',
        type: 'city',
    },
    Mediolan: {
        country: 'Spain',
        owner: 'Lolek',
        type: 'city',
    },
    Barcelona: {
        country: 'Spain',
        owner: 'Reksio',
        type: 'city',
    },
    Berlin: {
        country: 'Germany',
        owner:'Romek',
        type: 'city',
    },
    Frankfurt: {
        country: 'Germany',
        owner: 'Atomek',
        type: 'city',
    },
    Munich: {
        country: 'Germany',
        owner: 'Romek',
        type: 'city',
    },
    London: {
        country: 'UK',
        owner: 'Mr Been',
        type: 'city',
    },
    Glasgow: {
        country: 'UK',
        owner: 'Mr Been',
        type: 'city',
    },
    Liverpool: {
        country: 'UK',
        owner: 'Mr Been',
        type: 'city',
    }
}

describe('areAllEstatesSamePlayer', () => {
    it('Should return true if owner is Bolek and Greece', () => {
        const descriptor = testSet1['Ateny'];
        const player = 'Bolek';
        const result = areAllEstatesSamePlayer(descriptor, testSet1, player)
        expect(result).toBe(true);
    });
    it('Should return false if player undefined', () => {
        const descriptor = testSet1['Antarktyda'];
        const player = undefined;
        const result = areAllEstatesSamePlayer(descriptor, testSet1, player)
        expect(result).toBe(false);
    })
    it('Should return false if player Lolek, as Barcelona belongs to Reksio', () => {
        const descriptor = testSet1['Madryt'];
        const player = 'Lolek';
        const result = areAllEstatesSamePlayer(descriptor, testSet1, player)
        expect(result).toBe(false);
    })
    it('Should return false if player is not Reksio', () => {
        const descriptor = testSet1['Barcelona'];
        const player = 'Lolek';
        const result = areAllEstatesSamePlayer(descriptor, testSet1, player)
        expect(result).toBe(false);
    })
    it('Should return fasle if player is Romek', () => {
        const descriptor = testSet1['Berlin'];
        const player = 'Romek';
        const result = areAllEstatesSamePlayer(descriptor, testSet1, player)
        expect(result).toBe(false);
    })
    it('Should return true if player is mr Been', () => {
        const descriptor = testSet1['Glasgow'];
        const player = 'Mr Been';
        const result = areAllEstatesSamePlayer(descriptor, testSet1, player)
        expect(result).toBe(true);
    })
})

describe('getSameSetOfSameType should return proper values', () => {
    it('Should return London, Glasgow, Liverpool if keyToMatch is London, or Galsgow', () => {
        const result1 = getSameSetOfSameType(testSet1, 'London');
        const {London, Glasgow, Liverpool} = testSet1;
        const expected = { London, Glasgow, Liverpool }
        expect(result1).toEqual(expected);
    }),
    it('Sould return all railways', () => {

    }),
    it('Should return water and power plant', () => {
        
    })
})