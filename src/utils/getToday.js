function decoNum(numString) {
    if(numString.length < 2) {
        return '-0' + numString
    } else {
        return '-' + numString;
    }
}

export default function getToday() {
    var todayInDate = new Date();
    return todayInDate.getFullYear().toString() + 
        decoNum((todayInDate.getMonth() + 1).toString()) + 
        decoNum(todayInDate.getDate().toString());
}