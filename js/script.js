//Selecionar Elementos
const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

//classes
class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    //add digit to calculator screen
    addDigit(digit) {

        this.currentOperation = digit
        this.updateSren()
    }

    // chance values of the claculator screen
    updateSren() {
        this.currentOperationText.innerText += this.currentOperation;
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

//Eventos
buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {

            calc.addDigit(value);

        } else {

            console.log('op' + value)

        }
    });
});

