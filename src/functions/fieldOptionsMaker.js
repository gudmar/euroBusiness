

        const getOptionsCity = (data) => {
            const {
                country,
                visit,
                info,
                price,
                mortge,
                housePrice,
                hotelPrice,
                owner,
                isPlegded,
            } = data
        }
        const getOptionsStart = (data) => {
            const {info} = data;
            return {

            }
        }
        const getOptionsChanceBlue = (data) => {

        }
        const getOptionsChanceRed = (data) => {

        }
        const getOptionsGuardedPark = (data) => {

        }
        const getOptionsFreePark = (data) => {

        }
        const getOptionsJai = (data) => {

        }
        const getOptionsGoToJai = (data) => {

        }
        const getOptionsRailway = (data) => {

        }
        const getOptionsPowerStation = (data) => {

        }
        const getOptionsWaterPlant = (data) => {

        }
        const getOptionsTax = (data) => {

        }

const fieldOptionsMaker = (data) => {
    const {
        type,
        boardFieldNumber,
        visit,
        info,
        country,
        price,
        mortage,
        housePrice,
        hotelPrice,
        owner,
        nrOfHouses,
        nrInSet,
        nrOfHousesToPUrchase,
        nrOfHousesToSell,
        boardFieldNumber,
        isPlegded,
        wait,  
    } = data;

    // default (at any time) options: build a house, sell a house, build a hotel, mortage estate, buy from mortage,

    switch(type) {
        case 'city': return getOptionsCity;
        case 'start': return getOptionsStart;
        case 'chanceBlue': return getOptionsChanceBlue;
        case 'chanceRed': return getOptionsChanceRed;
        case 'guardedPark': return getOptionsGuardedPark;
        case 'freePark': return getOptionsFreePark;
        case 'jail': return getOptionsJail
        case 'go_to_jail': return getOptionsGoToJail
        case 'railway': return getOptionsRailway;
        case 'powerStation': return getOptionsPowerStation;
        case 'waterPlant': return getOptionsWaterPlant;
        case 'tax': return getOptionsTax;
        default: throw new Error('fieldOptionsMaker: type did not match one of field types.')
    }
 }

 const getFieldOptions = data => {
     const fieldRelatedOptions = fieldOptionsMaker(data);
     const defaultOptions = defaultOptionsMaker();
     return [...fieldOptionsMaker, ...defaultOptions]
 }

 export {
    getOptionsCity,
    getOptionsStart,
    getOptionsChanceBlue,
    getOptionsChanceRed,
    getOptionsGuardedPark,
    getOptionsFreePark,
    getOptionsJai,
    getOptionsGoToJai,
    getOptionsRailway,
    getOptionsPowerStation,
    getOptionsWaterPlant,
    getOptionsTax,
    fieldOptionsMaker,
    getFieldOptions,
 }