export default function allowNumbersOnly(e) {
    var keyCode = e.keyCode === 0 ? e.charCode : e.keyCode;
    var value = Number(e.target.value + e.key) || 0;
    if (keyCode >= 48 && keyCode <= 57) {
        return isValidNumber(value);
    }
    else {
        e.preventDefault();
    }
    return false;
}

const isValidNumber = (number) => {
    return (1 <= number && number <= 10)


}

export function AllowCharsOnly(e) {
    var keyCode = e.charCode;
    var value = Number(e.target.value + e.key) || 0;
    if ((((keyCode >= 65 && keyCode <= 123)||(keyCode===32)) && (keyCode !== 0&&keyCode!==94&&keyCode !== 47) && (keyCode !== 40 && keyCode !== 41))) {
      
        return value
    }
    else {
        e.preventDefault();
    }
    return false;

}