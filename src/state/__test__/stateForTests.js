import {countries, notCountryTypes} from '../../functions/countryTypes.js'

const testState = {
    Ateny: {
        id: 'Ateny',
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

const currentPlayerData = {
    cash: 3000,
    color: 'blue',
    extraCards: [],
    fieldNumber: 9,
    name: 'Player_1',
    turnToStale: 0,
};

const playerSlice = {
    currentPlayer: 'blue',
    diceResult: 0,
    dublet: 0,
    diceThrown: false,
    gublet: 0,
    player: 'human',
    black: {
        name: 'Player_2', color: 'black', fieldNumber: 0,
        cash: 3000, extraCartd:[], player: 'computer',
    },
    blue: currentPlayerData,
}

const stateForFieldOptionsTests = [
    // +  Should return a message: You stop on the 'start' field, that means You get 
    // +  $400. Notihing to do here.

    // +  Should retorn a single OK button
    {
        id: 'Start',
        type: 'start',
        boardFieldNumber: 1,
        visit: [-400],
        info: "You stop on the 'start' field, that means You get $400. Notihing to do here."
    },
    // Should give an option to buy a city if bank owns it,

    // + If player has enough cash and bank owns the city, it should return text:
    // + You stop in 'Ateny' city. Its onwed by bank. You don't have to pay for 
    // + staying here. You may purchase this city. If You don't it will be auctioned

    // + If another player owns this city, and only this city in greece, and player has enough cash to pay for stay should return text:
    // + You stop in 'Ateny' city. Its ownde by 'player2'. 'Player2' owns 1 estate in Greece, 
    // + so  you have to pay  $10.

    // +  If another player owns this city, that another player owns also 'Saloniki', and player that stood has enough cash to pay for stay should return text:
    // +  You stop in 'Ateny' city. Its ownde by 'player2'. 'Player2' owns 2 estateS in Greece, 
    // +  so  you have to pay  $20.

    // + If another player owns this city, and has one house here, and player that stepped has enough cash to pay for the visit should return text:
    // + You step in 'Ateny' city. Its owned by 'player2'. Player2' has 1 house in 'Ateny'.
    // + You should pay: $40

    // + If another player owns this city, and has 2 houses here, and player that stepped has enough cash to pay for the visit should return text:
    // + You step in 'Ateny' city. Its owned by 'player2'. Player2' has 2 houseS in 'Ateny'.
    // + You should pay: $120

    // + If another player owns this city, and has 3 houses here, and player that stepped has enough cash to pay for the visit should return text:
    // + You step in 'Ateny' city. Its owned by 'player2'. Player2' has 3 houseS in 'Ateny'.
    // + You should pay: $360

    // + If another player owns this city, and has 4 houses here, and player that stepped has enough cash to pay for the visit should return text:
    // + You step in 'Ateny' city. Its owned by 'player2'. Player2' has 4 houseS in 'Ateny'.
    // + You should pay: 640

    // + If another player owns this city, and has 5 houses here, and player that stepped has enough cash to pay for the visit should return text:
    // + You step in 'Ateny' city. Its owned by 'player2'. Player2' has 1 hotel in 'Ateny'.
    // + You should pay: $900

    // RETHINK the tests, as player may sell properties to other players, so some game los scenarios are not valid

    // + If another player owns this city, and has 2 houses here, and player that stepped 
    // + has NOT enough cash to pay for the visit, but still can mortage, should return text:
    // + You step in 'Ateny' city. Its owned by 'player2'. Player2' has 2 houseS in 'Ateny'.
    // + You should pay $120. You don't have enough cash, but you still can get ${ammountOfMoneyFromBank} from the bank,
    // + or You may try to sell properties to another player.


    // + If another player owns this city, and has 2 houses here, and player that stepped 
    // + has NOT enough cash to pay for the visit, cannot get enough cash from the bank, but
    // + has any estate should return text:
    // + You step in 'Ateny' city. Its owned by 'player2'. Player2' has 2 houseS in 'Ateny'.
    // + You should pay $120, but you are too poor. Even dealing with the bank will not help.
    // + The only rescue is to bargain with another players. You may give 10 offers for your 
    // + estates.

    // +  If another player owns this city, and has 2 houses here, and player that stepped 
    // +  has NOT enough cash to pay for the visit, cannot get enough cash from the bank, but
    // +  has any estate should return text:
    // +  You step in 'Ateny' city. Its owned by 'player2'. Player2' has 2 houseS in 'Ateny'.
    // +  You should pay: $120, but you are too poor. If you had anything of a value perhaps 
    // +  You could do anything to stay in the game a bit longer.


    // + In case another player has a 'Ateny' but it is mortaged, should return text:
    // + You step in 'Ateny' city. Its owned by 'player2'. 'Ateny' is mortaged, so 
    // + no fee for stopping by.

    // BUTTONS -----
    
    // + If the bank owns Ateny, and player stands and has enough cash should return 
    // + buttons 'Buy', 'Auction'

    // If the bank owns Ateny, and player stands and has not enough cash, but can mortage
    // should return 2 buttons: 'Auction', 'Estate manager'

    // If player stands on 'Ateny', and another player owns it, and only it and player that
    // stood on Atheny has not enough cash, but can mortage, should return 2 buttons:
    // 'Auction', 'Estate Manager'

    // If player stands on 'Ateny', and another player owns it, and player that stood has not cash
    // and can not mortage anymore, not owns estates should return one button:
    // Ok


    // === The same player :

    // If player stops in Ateny, and he owns it, should display text: 
    // You step in 'Ateny' city. Its owned by you. You may visit estate manager for 
    // more options.

    // If player stops in Ateny, and he owns it, should display button:
    // 'Estate Manager'






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
    {
        id: 'Insbruck',
        country: countries.austria,
        type: 'city',
        price: 700,
        mortage: 350,
        housePrice: 400,
        hotelPrice: 400,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        visit: [ 70, 140, 350, 1000, 2200, 2600, 3000 ], // 0 houses, 1 house, 2 houses...
        owner: 'blue',
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
    {
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
    // 2 properties of this type, so you have to pay 100$. You don't have enough cash, but you still can get ${ammountOfMoneyFromBank} from the bank,
    // or You may try to sell properties to another player.'

    // In case Shouth Railways and North Railways is owned by another player, 
    // and player has NOT enough cash to pay for stay but still has any estate should return text:
    // You stop in 'Shouth Railways'. Its owned by the 'playerName'. This player owns 
    // 2 properties of this type, so you have to pay 100$, but you are too poor. Even dealing with the bank will not help.
    // The only rescue is to bargain with another players. You may give 10 offers for your 
    // estates.'


    // In case Shouth Railways and North Railways is owned by another player, 
    // and player has NOT enough cash to pay for stay and owns no estates should return text:
    // You stop in 'Shouth Railways'. Its owned by the 'playerName'. This player owns 
    // 2 properties of this type, so you have to pay 100$, but you are too poor. If you had anything of a value perhaps 
    // You could do anything to stay in the game a bit longer.

    

    // === The same player :

    // If player stops in South Railways, and he owns it, should display text: 
    // You step in 'South Railway' . Its owned by you. You may visit estate manager for 
    // more options.

    // If player stops in South Railway, and he owns it, should display button:
    // 'Estate Manager'



    {
        id: 'South Railways',
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
    {
        id: 'West Railways',
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
    {
        id: 'North Railways',
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
    {
        id: 'East Railways',
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

    // If player stops on Power Station and its owned by the bank, should return text:
    // You stop in Power Station. Its owned by the bank. You don't have to pay for 
    // staying here. You may purchase this estate. If You don't it will be auctioned.

    // If player stops on Power Station and it is owned by another player, and 
    // its the only estate of this type that player has, and player that
    // stepped has enough money to pay,  should return text:
    // You stop in Power Stateion. Its ownded by 'Player 2'. You should pay 
    // 10 x thrown dice result, and that is ${mockedDiceResult}.

    // If player stops on Power Station and it is owned by another player, and 
    // its the only estate of this type that player has, and player that
    // stepped DOES NOT have enough money to pay, but can mortage,  should return text:
    // You stop in Power Stateion. Its ownded by 'Player 2'. You should pay 
    // 10 x thrown dice result, and that is ${mockedDiceResult}.  You don't have enough cash, but you still can get ${ammountOfMoneyFromBank} from the bank,
    // or You may try to sell properties to another player.


    // If player stops on Power Station and it is owned by another player, and 
    // its the only estate of this type that player has, and player that
    // stepped DOES NOT have enough money to pay, and CANNOT mortage, but still
    // has any property  should return text:
    // You stop in Power Stateion. Its ownded by 'Player 2'. You should pay 
    // 10 x thrown dice result, and that is ${10 x mockedDiceResult}, but you are too poor. Even dealing with the bank will not help.
    // The only rescue is to bargain with another players. You may give 10 offers for your 
    // estates.

    // If player stops on Power Station and it is owned by another player, and 
    // its the only estate of this type that player has, and player that
    // stepped DOES NOT have enough money to pay, and CANNOT mortage, and has no
    // estate should return text:
    // You stop in Power Stateion. Its ownded by 'Player 2'. You should pay 
    // 10 x thrown dice result, and that is ${10 x mockedDiceResult}, but you are too poor. If you had anything of a value perhaps 
    // You could do anything to stay in the game a bit longer.
    

    // If player stops on Power Stateion and it is owned by another player, and 
    // that player has also Water Planant, but player that stopped has enough cash to pay for it should return text:
    // You stop in Power Stateion. Its owned by 'Player 2'. You should pay 
    // 20 x throw dice result, and that is ${20 x mockedDiceResult}

    // If player stops on WaterPlant and it is owned by another player, and that player
    // has WaterPlant mortaged, should return text:
    // You stop on Water Plant. Its owned by 'Player 2'. 'Water Plant' is mortaged, so 
    // no fee for stopping by.



        // === The same player :

    // If player stops in Water Plant, and he owns it, should display text: 
    // You step in 'Water Plant'. Its owned by you. You may visit estate manager for 
    // more options.

    // If player stops in Water Plant, and he owns it, should display button:
    // 'Estate Manager'

    {
        id: 'Power Station',
        country: notCountryTypes.plant,
        type: 'powerStation',
        price: 300,
        mortage: 150,
        owner: 'bank',
        nrInSet: 2,
        boardFieldNumber: 13,
        visit: [ '10 x thrown dice result', '20 x thrown dice result'],
        isPlegded: false,
    },

    {   id: 'Water Plant',
        country: notCountryTypes.plant,
        type: 'waterPlant',
        price: 300,
        mortage: 150,
        owner: 'bank',
        nrInSet: 2,
        boardFieldNumber: 29,
        visit: [ '10 x thrown dice result', '20 x thrown dice result'],
        isPlegded: false,
    },

    // If player stops on Tax, and player has enought cash should return text:
    // You stop on 'Tax'. You have to pay $200.

    // If player stops on Tax, and player has NOT enought cash but can mortage should return text:
    // You stop on 'Tax'. You have to pay $200.

    // If player stops on Tax, and player has NOT enought cash should return text:
    // You stop on 'Tax'. You have to pay $200, but you are too poor. No matter 
    // how hard you try, you will not be able to pay your debt. You loose the game.




    {
        id: 'Tax',
        type: 'tax',
        visit: [200],
        info: 'You pay $200, nothing more happens here.',
    },

]
export { stateForFieldOptionsTests, currentPlayerData, playerSlice }
export default testState;