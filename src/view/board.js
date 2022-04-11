import ArrowBack from '@material-ui/icons/ArrowBack'
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import LocalParking from '@material-ui/icons/LocalParking';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import HouseSharp from '@material-ui/icons/HouseSharp';
import Train from '@material-ui/icons/Train';
import Power from '@material-ui/icons/esm/Power';
import Euro from '@material-ui/icons/Euro';

const boardFieldView = {
            Start: {
                width: 2,
                color: undefined,
                icon: ArrowBack,
                titleSize: 'big',
                direction: '-45deg',
            },
            Ateny: {
                width: 1,
                color: 'yellow',
                icon: undefined,
                direction: '0deg',
            },
            Chance_blue: {
                color: 'blue',
                width: 1,
                titleSize: 'huge',
                direction: '0deg',
            },
            Chance_red: {
                color: 'red',
                width: 1,
                titleSize: 'huge',
                icon: QuestionAnswer,
                direction: '0deg',
            },
            Chance_blue_left: {
                color: 'blue',
                width: 1,
                titleSize: 'huge',
                direction: '90deg',
            },
            Chance_red_left: {
                color: 'red',
                width: 1,
                titleSize: 'huge',
                icon: QuestionAnswer,
                direction: '90deg',
            },
            Chance_blue_top: {
                color: 'blue',
                width: 1,
                titleSize: 'huge',
                direction: '180deg',
            },
            Chance_red_top: {
                color: 'red',
                width: 1,
                titleSize: 'huge',
                icon: QuestionAnswer,
                direction: '180deg',
            },
            Chance_blue_right: {
                color: 'blue',
                width: 1,
                titleSize: 'huge',
                direction: '270deg',
            },
            Chance_red_right: {
                color: 'red',
                width: 1,
                titleSize: 'huge',
                icon: QuestionAnswer,
                direction: '270deg',
            },



            Saloniki: {
                width: 1,
                color: 'yellow',
                icon: undefined,
                direction: '0deg',
            },
            Guarded_Parking: {
                ccolor: 'red',
                width: 1,
                titleSize: 'huge',
                icon: LocalParking,
                direction: '0deg',
            },
            Free_Parking: {
                color: undefined,
                width: 2, 
                direction: '135deg',
                icon: DirectionsCar,
            },
            Jail: {
                color: undefined,
                width: 2,
                direction: '45deg',
                icon: HouseSharp,
            },
            Go_to_jail: {
                direction: '225deg',
                width: 2,
                color: undefined,
                symbol: 'U+1F6A8'
            },
            South_Railways: {
                color: undefined,
                direction: '0deg',
                icon: 'Train',
                width: 1,
            },
            Neapol: {
                width: 1,
                color: 'red',
                icon: undefined,
                direction: '0deg',
            },
            Mediolan: {
                width: 1,
                color: 'red',
                icon: undefined,
                direction: '0deg',
            },
            Rome: {
                width: 1,
                color: 'red',
                icon: undefined,
                direction: '0deg',
            },
            Barcelona: {
                width: 1,
                color: 'blue',
                icon: undefined,
                direction: '90deg',
            },
            Power_Station: {
                width: 1,
                color: undefined,
                icon: Power,
                direction: '90deg',

            },
            Sewilla: {
                width: 1,
                color: 'blue',
                icon: undefined,
                direction: '90deg',

            },
            Madrit: {
                width: 1,
                color: 'blue',
                icon: undefined,
                direction: '90deg',

            },
            West_Railways: {
                color:undefined,
                direction: '90deg',
                icon: 'Train',
                width: 1,
            },
            Liverpool: {
                width: 1,
                color: 'orange',
                icon: undefined,
                direction: '90deg',
            },
            Glasgow: {
                width: 1,
                color: 'orange',
                icon: undefined,
                direction: '90deg',
            },
            Londyn: {
                width: 1,
                color: 'orange',
                icon: undefined,
                direction: '90deg',
            },
            Rotterdam: {
                width: 1,
                color: 'green',
                icon: undefined,
                direction: '180deg',
            },
            Bruksela: {
                width: 1,
                color: 'green',
                icon: undefined,
                direction: '180deg',
            },
            Amsterdam: {
                width: 1,
                color: 'green',
                icon: undefined,
                direction: '180deg',
            },
            North_Railways: {
                color:undefined,
                direction: '180deg',
                icon: Train,
                width: 1,
            },
            Malmo: {
                width: 1,
                color: 'purple',
                icon: undefined,
                direction: '180deg',
            },
            Goteborg: {
                width: 1,
                color: 'purple',
                icon: undefined,
                direction: '180deg',

            },
            Water_plant: {
                width: 1,
                color: undefined,
                icon: 'Wash',
                direction: '180deg',

            },
            Sztokholm: {
                width: 1,
                color: 'purple',
                icon: undefined,
                direction: '180deg',

            },
            Frankfurt: {
                width: 1,
                color: 'brown',
                icon: undefined,
                direction: '270deg',
            },
            Kolonia: {
                width: 1,
                color: 'brown',
                icon: undefined,
                direction: '270deg',
            },
            Bonn: {
                width: 1,
                color: 'brown',
                icon: undefined,
                direction: '270deg',
            },
            East_Railways: {
                color:undefined,
                direction: '270deg',
                icon: 'Train',
                width: 1,
            },
            Insbruck: {
                width: 1,
                color: 'black',
                icon: undefined,
                direction: '270deg',
            },
            Tax: {
                type: 'tax',
                icon: 'Euro',
                direction: '270deg',
            },
            Wieden: {
                width: 1,
                color: 'black',
                icon: undefined,
                direction: '270deg',
            },
        };

export default boardFieldView;