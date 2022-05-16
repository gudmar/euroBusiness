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

};

const stateForFieldOptionsTests = [
    // Should return a message: You stop on the 'start' field, that means You get 
    // $400. Notihing to do here.
    {
        id: 'Start',
        type: 'start',
        boardFieldNumber: 1,
        visit: [-400],
        info: 'Does nothing, a player gets $400 after passing this field.'
    },
    // Should give an option to buy a city if bank owns it,

    // If player has enough cash and bank owns the city, it should return text:
    // You stop in 'Ateny' city. Its onwed by bank. You don't have to pay for 
    // staying here. You may purchase this city. If You don't it will be auctioned

    // If player has enough cash, Should return 2 buttons: for purchase and for auction

    // If player has not enough cash should return 1 button: auction

    {
        id: 'Ateny',
        type: 'city',
        country: countries.greece,
        price: 120,
        mortage: 60,
        housePrice: 100,
        hotelPrice: 100,
        visit: [ 10, 40, 120, 360, 640, 900 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 2, // 2 cities in the country
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        boardFieldNumber: 2,
        isPlegded: false, // zastawiony
    },
    {
        id: 'Saloniki',
        country: countries.greece,
        type: 'city',
        price: 120,
        mortage: 60,
        housePrice: 100,
        hotelPrice: 100,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 10, 40, 120, 360, 640, 900 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 2,
        boardFieldNumber: 4,
        isPlegded: false,
    },
    // Should return the text of the chance card. Will be tasted later...
    {
        id: 'Chance_blue',
        type: 'chanceBlue',
        info: 'Draw a blue chance card'
    },
    // Should return the text of the chance card. Will be tasted later...
    {
        id: 'Chance_red',
        type: 'chanceRed',
        info: 'Draw a red chance card',
    },
    // Should return the text of the chance card. Will be tasted later...
    {
        id: 'Chance_blue_left',
        type: 'chanceBlue',
        info: 'Draw a blue chance card'
    },
    // Should return the text of the chance card. Will be tasted later...
    {
        id: 'Chance_red_right',
        type: 'chanceRed',
        info: 'Draw a red chance card',
    },
    // Should return text: You stop on a guarded car park. You have to pay $400.

    // Should return 'ok' button if player has enough cash

    // Should return 'Estate Manager' button in case player has not enough cash

    {
        id: 'Guarded_Parking',
        type: 'guardedPark',
        boardFieldNumber: 5,
        visit: [400],
        info: 'You pay $400 for staying one extra trun here. This is mandatory,',
    },
    // Should return text: You spend one extra turn here. The only good news is, there is no fee for staying here'
    // Should return an OK button
    Free_Parking: {
        id: 'Free_Parking',
        type: 'freePark',
        boardFieldNumber: 11,
        visit: [0],
        wait: 1,
        info: 'You spend one extra turn here. The only good news is, there is no fee for staying here',
    },
    // Should return text: You got into trouble, and you go to jail. You spend 2 idle turns here.'
    // Should return 'OK', button,
    {
        id: 'Jail',
        type: 'jail',
        boardFieldNumber: 11,
        wait: 2,
        info: 'You spend 2 extra turns here.',
    },
    // Should return 'You go to jail. You do not pass 'Start' and you don't get extra $400'
    // Should return 'OK' button,
    {
        id: 'Go_to_jail',
        type: 'go_to_jail',
        boardFieldNumber: 31,
        info: 'You go to field 11, jail and spend 2 extra turns there.'
    },
    // If player has enough cash and bank owns the railway, it should return text:
    // You stop in 'Shuth Railways'. Its onwed by bank. You don't have to pay for 
    // staying here. You may purchase this estate. If You don't it will be auctioned

    // If player has not enough cash, but still can sell/mortage estates should return text:
        // You stop in 'Shuth Railways'. Its onwed by bank. You don't have to pay for 
    // staying here. You may purchase this estate. If You don't it will be auctioned

    // If player has not enough cash, and is not capable of mortaging, selling estates
    // for enough cash thers should be text:
    // You stop in 'Shuth Rilways'. Its owned by the bank. You don't have enough cash 
    // to bu this estate, so it will be auctioned.

    // If player has onough cash, and South Railways is owned by the bank, should return buttons:
    // 'Buy', 'Auction',

    // If plyaer has not enough cash, but can sell/ mortage estates, then should return buttons:
    // 'Auction', 'Estate Manager',

    // If player has not enough cash, and is not capable of selling/mortaging estates,
    // should return 'OK' button,

    // ------------------ Owned by players: ------------------------

    // In case Only Shouth Railways is owned by another player, and player has enough cash to pay for stay should return text:
    // You stop in 'Shouth Railways'. Its owned by the 'playerName'. This player owns 
    // 1 property of this type, so you have to pay 50$.'

    // In case Shouth Railways and North Railways is owned by another player, and player has enough cash to pay for stay should return text:
    // You stop in 'Shouth Railways'. Its owned by the 'playerName'. This player owns 
    // 2 properties of this type, so you have to pay 100$.'

    // In case Shouth Railways and North Railways and West Railways is owned by another player, and player has enough cash to pay for stay should return text:
    // You stop in 'Shouth Railways'. Its owned by the 'playerName'. This player owns 
    // 3 properties of this type, so you have to pay 200$.'

    // In case all railways are owned by another player, and player has enough cash to pay for stay should return text:
    // You stop in 'Shouth Railways'. Its owned by the 'playerName'. This player owns 
    // 4 properties of this type, so you have to pay 40$.'

    // In case Shouth Railways and North Railways is owned by another player, 
    // and player has NOT enough cash to pay for stay, but can sell/morgage should return text:
    // You stop in 'Shouth Railways'. Its owned by the 'playerName'. This player owns 
    // 2 properties of this type, so you have to pay 100$.'

    // In case Shouth Railways and North Railways is owned by another player, 
    // and player has NOT enough cash to pay for stay should return text:
    // You stop in 'Shouth Railways'. Its owned by the 'playerName'. This player owns 
    // 2 properties of this type, so you have to pay 100$, but you are too poor. No matter 
    // how hard you try, you will not be able to pay your debt. You loose the game.'

    





    South_Railways: {
        country: notCountryTypes.railways,
        type: 'railway',
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: 'bank',
        nrInSet: 4,
        boardFieldNumber: 6,
        isPlegded: false,
    },
    West_Railways: {
        country: notCountryTypes.railways,
        type: 'railway',
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: 'bank',
        nrInSet: 4,
        boardFieldNumber: 16,
        isPlegded: false,
    },
    North_Railways: {
        country: notCountryTypes.railways,
        type: 'railway',
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: 'bank',
        nrInSet: 4,
        boardFieldNumber: 26,
        isPlegded: false,
    },
    East_Railways: {
        country: notCountryTypes.railways,
        type: 'railway',
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: 'bank',
        nrInSet: 4,
        boardFieldNumber: 36,
        isPlegded: false,
    },





]

export default testState;