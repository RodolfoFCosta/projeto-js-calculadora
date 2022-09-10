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

        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit
        this.updateSreen()
    }

    //processar todos os operações da calculadora
    processOperation(operation) {
        // check curent is empty
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            // change operation
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        //get current and previous value
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;


        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateSreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateSreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateSreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateSreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDellOperation();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearAllCurrent();
                break;
            case "=":
                this.porcessEqualOperation();
                break;
            default:
                return;
        }
    }

    // chance values of the claculator screen
    updateSreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // check if value is zero, if it is jut add current value
            if (previous === 0) {
                operationValue = current
            }

            // add curent value to previous 
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    // change math operation
    changeOperation(operation) {

        const mathOperation = ["*", "/", "+", "-"]

        if (!mathOperation.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // deletar um digito
    processDellOperation() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }
    // deletar toda operaçao
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    processClearAllCurrent() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    porcessEqualOperation() {
        const operation = previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation);

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

            calc.processOperation(value)

        }
    });
});

