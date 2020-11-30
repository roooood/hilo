


export function params(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return false;
}
export const isArray = function (a) {
    return Array.isArray(a);
};
export const isObject = function (o) {
    return o === Object(o) && !isArray(o) && typeof o !== 'function';
};
export function isIterable(variable) {
    return isArray(variable) || isObject(variable);
}
export function clone(arr) {
    let newObj = (arr instanceof Array) ? [] : {};
    for (let i in arr) {
        if (i == 'clone')
            continue;
        if (arr[i] && typeof arr[i] == "object") {
            newObj[i] = clone(arr[i]);
        }
        else
            newObj[i] = arr[i]
    } return newObj;
};
export function toMoney(amount) {
    if (typeof amount == 'undefined' || amount == 'null')
        return '';
    if (amount.length < 2)
        return amount + '';
    return ("" + amount).replace(/,/g, '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}
export function toggle(collection, item) {
    let temp = clone(collection)
    var idx = temp.indexOf(item);
    if (idx !== -1) {
        temp.splice(idx, 1);
    } else {
        temp.push(item);
    }
    return temp;
}
export function numFa(num, dontTrim) {
    if (num == 'undefined' || typeof num == 'undefined')
        return '';
    dontTrim = dontTrim || false
    num = dontTrim ? num + "" : (num + "").trim();
    let i = 0,
        len = num.length,
        res = '',
        pos,
        persianNumbers = typeof persianNumber == 'undefined'
            ? ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
            : persianNumbers;

    for (; i < len; i++)
        if ((pos = persianNumbers[num.charAt(i)]))
            res += pos;
        else
            res += num.charAt(i);

    return res;
}
export function numEn(input) {
    if (input == undefined)
        return;
    var returnModel = "", symbolMap = {
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
        '۰': '0'
    };
    input = input.toString();
    for (var i = 0; i < input.length; i++)
        if (symbolMap[input[i]])
            returnModel += symbolMap[input[i]];
        else
            returnModel += input[i];
    return returnModel;
}
export function num(txt) {
    let ret = 0;
    if (typeof txt == 'string')
        ret = txt.replace(/[^\d\.]*/g, '')
    else
        ret = txt;
    return parseInt(ret)
}
export function chunk(arr, len) {
    var chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
}
export const pick = (obj, keys) => {
    const tmp = {};
    for (let i of keys) {
        tmp[i] = obj[i]
    }
    return tmp;
};
export const colorize = (str) => {
    let i = 0, hash = 0, color = '';
    for (i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
    color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
    return '#' + Array(6 - color.length + 1).join('0') + color;
}