import { debug } from '../containers/App';

export let smiles = [
    { smile: [':)', ':-)'], image: 'smile2.png', emojiName: ':)' },
    { smile: [':-J'], image: 'smile3.png', emojiName: ':-J' },
    { smile: ['XD'], image: 'smile4.png', emojiName: 'XD' },
    { smile: [':o)'], image: 'smile5.png', emojiName: ':o)' },
    { smile: [':#)'], image: 'smile6.png', emojiName: ':#)' },
    { smile: [':-D'], image: 'smile7.png', emojiName: ':-D' },
    { smile: ['=-P'], image: 'smile8.png', emojiName: '=-P' },
    { smile: [':-('], image: 'smile9.png', emojiName: ':-(' },
    { smile: [':-|'], image: 'smile10.png', emojiName: ':-|' },
    { smile: ['D-:'], image: 'smile11.png', emojiName: 'D-:' },
    { smile: [':-C'], image: 'smile12.png', emojiName: ':-C' },
    { smile: ['8)'], image: 'smile13.png', emojiName: '8)' },
    { smile: ['|_O'], image: 'smile14.png', emojiName: '|_O' },
    { smile: ['|_o'], image: 'smile15.png', emojiName: '|_o' },
    { smile: ['_^_'], image: 'smile16.png', emojiName: '_^_' },
    // { smile: ['oO_)'], image: 'smile17.png', emojiName: 'oO_)' },
    // { smile: ['^|^'], image: 'smile18.png', emojiName: '^|^' },
    // { smile: ['(/oo/)'], image: 'smile19.png', emojiName: '(/oo/)' },
];

export const filterMessage = (message: string) => {
    return message.replace(/</gi, "&lt;").replace(/>/gi, '&gt;');
}

export const insertSmiles = (text: string, smiles: any[]) => {
    let resultText = '';
    for (const smile of smiles) {
        let string = debug
            ? '<img style="vertical-align: bottom; width: 21px;padding: 0 5px;" src="/images/smiles/***"/>'
            : '<img style="vertical-align: unset; width: 31px;padding: 0 5px;" src="/public/images/smiles/***"/>';
        let prepareImageString = string.replace('***', smile.image);

        for (const smileVariarn of smile.smile) {
            let data = (resultText === '') ? text : resultText;
            // resultText = data.replace(smileVariarn, prepareImageString);
            resultText = data.split(smileVariarn).join(prepareImageString);
        }
    }
    return resultText;
}

export const CSS_COLOR_NAMES = [
    "Azure",
    "Black",
    "Blue",
    "BlueViolet",
    "Brown",
    "Crimson",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGreen",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrchid",
    "DarkRed",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkViolet",
    "DeepPink",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "ForestGreen",
    "Fuchsia",
    "Green",
    "IndianRed",
    "Indigo",
    "Magenta",
    "Maroon",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSlateBlue",
    "MediumVioletRed",
    "MidnightBlue",
    "Navy",
    "OrangeRed",
    "Orchid",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RoyalBlue",
    "SaddleBrown",
    "SeaGreen",
    "Sienna",
    "SlateBlue",
    "SlateGrey",
    "SteelBlue",
    "Teal",
    "Yellow",
];

export const getTime = (time: Date) => {
    let _time = new Date(time);
    return `(${_time.getHours()}.${_time.getMinutes() < 10 ? '0' + _time.getMinutes() : _time.getMinutes()})`;
}

export type messagesType = { name: string, massage: string, color: string, time: string }[];

