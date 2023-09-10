let displayValue = '';

function appendToDisplay(value) {
    displayValue += value;
    document.getElementById('display').value = displayValue;
}

function backspace() {
    displayValue = displayValue.slice(0, -1); // Remove the last character
    document.getElementById('display').value = displayValue;
}

function clearDisplay() {
    displayValue = '';
    document.getElementById('display').value = displayValue;
}

function calculateResult() {
    try {
        displayValue = evaluateWithBrackets(displayValue);
        document.getElementById('display').value = displayValue;
    } catch (error) {
        document.getElementById('display').value = 'Error';
        setTimeout(clearDisplay, 1000);
    }
}

function evaluateWithBrackets(expression) {
    const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, '');

    const hasValidBrackets = checkValidBrackets(sanitizedExpression);

    if (!hasValidBrackets) {
        throw new Error('Invalid bracket usage');
    }

    const result = eval(sanitizedExpression);
    return result;
}

function checkValidBrackets(expression) {
    const stack = [];
    for (let char of expression) {
        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            if (stack.length === 0 || stack.pop() !== '(') {
                return false;
            }
        }
    }
    return stack.length === 0;
}
