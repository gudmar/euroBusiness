import areAllEstatesSamePleyer from '../sameSortGetter.js';

const testSet1 = {
    Ateny: {
        country: 'Greece',
        owner: 'Bolek'
    },
    Saloniki: {
        country:'Greece',
        owner: 'Bolek',
    },
    Antarktyda: {
        country: 'None',
        owner: undefined
    },
    Arktyka: {
        country: 'None',
        owner: undefined
    },
    Madryt: {
        country: 'Spain',
        owner: 'Lolek'
    },
    Mediolan: {
        country: 'Spain',
        owner: 'Lolek',
    },
    Barcelona: {
        country: 'Spain',
        owner: 'Reksio',
    },
    Berlin: {
        country: 'Germany',
        owner:'Romek',
    },
    Frankfurt: {
        country: 'Germany',
        owner: 'Atomek',
    },
    Munich: {
        country: 'Germany',
        owner: 'Romek'
    },
    London: {
        country: 'UK',
        owner: 'Mr Been',
    },
    Glasgow: {
        country: 'UK',
        owner: 'Mr Been',
    },
    Liverpool: {
        country: 'UK',
        owner: 'Mr Been'
    }
}

describe('areAllEstatesSamePlayer', () => {
    it('Should return true if owner is Bolek and Greece', () => {
        const descriptor = testSet1['Ateny'];
        const player = 'Bolek';
        const result = areAllEstatesSamePleyer(descriptor, testSet1, player)
        expect(result).toBe(true);
    })
    it('Should return false if player undefined', () => {
        const descriptor = testSet1['Antarktyda'];
        const player = undefined;
        const result = areAllEstatesSamePleyer(descriptor, testSet1, player)
        expect(result).toBe(false);
    })
    it('Should return false if player Lolek, as Barcelona belongs to Reksio', () => {
        const descriptor = testSet1['Spain'];
        const player = 'Lolek';
        const result = areAllEstatesSamePleyer(descriptor, testSet1, player)
        expect(result).toBe(false);
    })
    it('Should return false if player is Reksio', () => {
        const descriptor = testSet1['Barcelona'];
        const player = 'Lolek';
        const result = areAllEstatesSamePleyer(descriptor, testSet1, player)
        expect(result).toBe(true);
    })
    it('Should return fasle if player is Romek', () => {
        const descriptor = testSet1['Berlin'];
        const player = 'Romek';
        const result = areAllEstatesSamePleyer(descriptor, testSet1, player)
        expect(result).toBe(false);
    })
    it('Should return true if player is mr Been', () => {
        const descriptor = testSet1['Glasgow'];
        const player = 'Mr Been';
        const result = areAllEstatesSamePleyer(descriptor, testSet1, player)
        expect(result).toBe(true);
    })
})