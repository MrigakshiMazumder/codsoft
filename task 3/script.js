document.addEventListener('DOMContentLoaded', () => {
    const previousOperandElement = document.getElementById('previous-operand');
    const currentOperandElement = document.getElementById('current-operand');
    const numberButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const equalsButton = document.querySelector('[data-equals]');
    const clearButton = document.querySelector('.clear-btn');

    let currentOperand = '';
    let previousOperand = '';
    let operation = undefined;
    let shouldResetScreen = false;

    const appendNumber = (number) => {
        if (number === '.' && currentOperand.includes('.')) return;
        if (currentOperand === '0' && number !== '.') {
            currentOperand = number;
        } else {
            currentOperand += number;
        }
    };

    const chooseOperation = (selectedOperation) => {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = selectedOperation;
        previousOperand = currentOperand;
        currentOperand = '';
    };

    const compute = () => {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        currentOperand = computation.toString();
        operation = undefined;
        previousOperand = '';
        shouldResetScreen = true;
    };

    const clear = () => {
        currentOperand = '';
        previousOperand = '';
        operation = undefined;
    };

    const updateDisplay = () => {
        currentOperandElement.innerText = currentOperand;
        if (operation != null) {
            previousOperandElement.innerText = `${previousOperand} ${operation}`;
        } else {
            previousOperandElement.innerText = previousOperand;
        }
    };

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentOperandElement.innerText === '0' || shouldResetScreen) {
                currentOperand = '';
                shouldResetScreen = false;
            }
            appendNumber(button.innerText);
            updateDisplay();
        });
    });

    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            chooseOperation(button.innerText);
            updateDisplay();
        });
    });

    equalsButton.addEventListener('click', () => {
        compute();
        updateDisplay();
    });

    clearButton.addEventListener('click', () => {
        clear();
        updateDisplay();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key >= 0 && e.key <= 9) {
            appendNumber(e.key);
            updateDisplay();
        } else if (e.key === '.') {
            appendNumber(e.key);
            updateDisplay();
        } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%') {
            chooseOperation(e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key);
            updateDisplay();
        } else if (e.key === 'Enter' || e.key === '=') {
            compute();
            updateDisplay();
        } else if (e.key === 'Escape') {
            clear();
            updateDisplay();
        } else if (e.key === 'Backspace') {
            currentOperand = currentOperand.slice(0, -1);
            if (currentOperand === '') currentOperand = '0';
            updateDisplay();
        }
    });
});
