const testState = {
    Ateny: {
        country: 'Greece',
        owner: 'Bolek',
        type: 'city',
        mortage: false,
        housePrice: 100,
        hotelPrice: 100,
        nrOfHouses: 0,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        isPlegded: false,

    },
    Saloniki: {
        country:'Greece',
        owner: 'Bolek',
        type: 'city',
        mortage: false,
        housePrice: 100,
        hotelPrice: 100,
        nrOfHouses: 0,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        isPlegded: false,

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
        mortage: false,
        housePrice: 100,
        hotelPrice: 100,
        nrOfHouses: 0,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        isPlegded: false,

    },
    Barcelona: {
        country: 'Spain',
        owner: 'Reksio',
        type: 'city',
        mortage: false,
        housePrice: 100,
        hotelPrice: 100,
        nrOfHouses: 0,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        isPlegded: false,

    },
    Berlin: {
        country: 'Germany',
        owner:'Romek',
        type: 'city',
        mortage: false,
        housePrice: 100,
        hotelPrice: 100,
        nrOfHouses: 0,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        isPlegded: false,

    },
    Frankfurt: {
        country: 'Germany',
        owner: 'Atomek',
        type: 'city',
        mortage: false,
        housePrice: 100,
        hotelPrice: 100,
        nrOfHouses: 0,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        isPlegded: false,

    },
    Munich: {
        country: 'Germany',
        owner: 'Romek',
        type: 'city',
        mortage: false,
        housePrice: 100,
        hotelPrice: 100,
        nrOfHouses: 0,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        isPlegded: false,

    },
    London: {
        country: 'UK',
        owner: 'Mr Been',
        type: 'city',
        isPlegded: false,
        nrOfHouses: 0,
    },
    Glasgow: {
        country: 'UK',
        owner: 'Mr Been',
        type: 'city',
        isPlegded: false,
        nrOfHouses: 0,
    },
    Liverpool: {
        country: 'UK',
        owner: 'Mr Been',
        type: 'city',
        isPlegded: false,
        visit: [30, 140, 400, 1100, 1500, 1900],
        nrOfHouses: 0,
    },
    South_Railways: {
        country: "Railways",
        type:'railway',
        price: 400,
        mortage: 200,
        owner:'bank',
        isPlegded: false,
        nrInSet: 4,
    },
    North_Railways: {
        country: "Railways",
        type:'railway',
        price: 400,
        mortage: 200,
        owner:'bank',
        isPlegded: false,
        nrInSet: 4,
        visit: [50, 100, 200, 400]
    },
    West_Railways: {
        country: "Railways",
        type:'railway',
        price: 400,
        mortage: 200,
        owner:'bank',
        isPlegded: false,
        nrInSet: 4,
    },
    East_Railways: {
        country: "Railways",
        type:'railway',
        price: 400,
        mortage: 200,
        owner:'bank',
        isPlegded: false,
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
    Guarded_Parking: {
        type: 'guardedPark',
        boardFieldNumber: 5,
        visit: [400],
        info: 'You pay $400 for staying one extra trun here. This is mandatory,',
    },
    Tax: {
        type: 'tax',
        visit: [200],
        info: 'You pay $200, nothing more happens here.',
    },

}

export default testState;