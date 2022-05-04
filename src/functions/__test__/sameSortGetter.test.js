import  {
    areAllEstatesSamePlayer,
    getSameSetOfSameType,
    getTargetPlayerBelongings,
    doAllBelongToSamePlayer,
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
    },
    South_Railways: {
        country: "Railways",
        type:'railway',
        price: 400,
        mortage: 200,
        owner:'bank',
        isPlagded: false,
        nrInSet: 4,
    },
    North_Railways: {
        country: "Railways",
        type:'railway',
        price: 400,
        mortage: 200,
        owner:'bank',
        isPlagded: false,
        nrInSet: 4,
    },
    West_Railways: {
        country: "Railways",
        type:'railway',
        price: 400,
        mortage: 200,
        owner:'bank',
        isPlagded: false,
        nrInSet: 4,
    },
    East_Railways: {
        country: "Railways",
        type:'railway',
        price: 400,
        mortage: 200,
        owner:'bank',
        isPlagded: false,
        nrInSet: 4,
    },
    Water_Plant: {
        country: 'Plant',
        type: 'waterPlant',
        price: 300,
        mortage: 150,
        owner: 'bank',
        nrInSet: 2,
        boardFieldNumber: 29,
        visit: [ '10 x thrown dice result', '20 x thrown dice result'],
        isPlegded: false,
    },
    Power_Station: {
        country: 'Plant',
        type: 'powerStation',
        price: 300,
        mortage: 150,
        owner: 'bank',
        nrInSet: 2,
        boardFieldNumber: 13,
        visit: [ '10 x thrown dice result', '20 x thrown dice result'],
        isPlegded: false,
    },

}

describe('sameSortGetter: areAllEstatesSamePlayer', () => {

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

describe('sameSortGetter: getSameSetOfSameType should return proper values', () => {
    it('Should return London, Glasgow, Liverpool if keyToMatch is London, or Galsgow', () => {
        const result1 = getSameSetOfSameType(testSet1, 'London');
        const {London, Glasgow, Liverpool} = testSet1;
        const expected = { London, Glasgow, Liverpool }
        expect(result1).toEqual(expected);
    });
    it('Sould return all railways', () => {
        const result = getSameSetOfSameType(testSet1, 'South_Railways');
        const { South_Railways, North_Railways, West_Railways, East_Railways } = testSet1;
        const expected = { South_Railways, North_Railways, West_Railways, East_Railways };
        expect(result).toEqual(expected);
    });
    it('Should return water and power plant', () => {
        const result = getSameSetOfSameType(testSet1, 'Power_Station');
        const {Power_Station, Water_Plant} = testSet1;
        const expected = { Power_Station, Water_Plant };
        expect(result).toEqual(expected);
    });
})

describe('sameSortGetter: getTargetPlayerBelongings', () => {
    it('Should return all Boleks belongings', () => {
        const { Saloniki, Ateny } = testSet1;
        const expected = {Saloniki, Ateny};
        expect(expected).toEqual(getTargetPlayerBelongings(testSet1, 'Bolek'));
    });
    it('Should return all bank estates', () => {
        const { Power_Station, Water_Plant, East_Railways, South_Railways,North_Railways, West_Railways } = testSet1;
        const expected = { Power_Station, Water_Plant, East_Railways, South_Railways,North_Railways, West_Railways };
        const result = getTargetPlayerBelongings(testSet1, 'bank');
        expect(expected).toEqual(result)
    })
})

describe('sameSortGetter: soAllBelongToSamePlayer should work as expected', () => {
    it('Should return true for Saloniki', () => {
        const result = doAllBelongToSamePlayer(testSet1, 'Saloniki');
        expect(result).toBe(true);
    });
    it('Should return true for railways (warning: belongs to bank)', () => {
        const result = doAllBelongToSamePlayer(testSet1, 'South_Railways');
        expect(result).toBe(true)
    })
})



