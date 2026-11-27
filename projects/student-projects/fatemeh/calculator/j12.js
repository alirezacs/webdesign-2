class Calculator {
     constructor() {
    this.number = 0;
}

    add(num) {
    this.number += num;
}

  subtract(num) {
        this.number -= num;
    }

     multiply(num) {
        this.number *= num;
    }

     divide(num) {
        this.number /= num;
    }


    sqrt() {
        this.number = Math.sqrt(this.number);
    }


}

let calc = new Calculator();

let input = document.getElementById("input");
let keys = document.getElementById("keys");



let firstNumber = 0;
let operator = "";
let memory = 0;


keys.addEventListener("click", e => {

let value = e.target.textContent;


    if (!isNaN(value) || value === ".") {
    input.value += value;
}

  if (value === "AC") {
        input.value = "";
        firstNumber = 0;
        operator = "";
    }


if (value === "CE" || value === "←") {
    input.value = input.value.slice(0, -1);
}


if (value === "+" || value === "-" || value === "×" || value === "÷") {

        firstNumber = Number(input.value);
        operator = value;
        input.value = "";

    }

 if (value === "=") {
    let secondNumber = Number(input.value);

    calc.number = firstNumber;

    if (operator === "+") {
        calc.add(secondNumber);
    }

    if (operator === "-") {
        calc.subtract(secondNumber);
    }

    if (operator === "×") {
        calc.multiply(secondNumber);
    }

    if (operator === "÷") {
        calc.divide(secondNumber);
    }

    input.value = calc.number;
}

if (value === "√") {
    calc.number = Number(input.value);
    calc.sqrt();
    input.value = calc.number;
}

if (value === "%") {
    input.value = Number(input.value) / 100;
}

if (value === "+M") {
    memory += Number(input.value);
}

if (value === "-M") {
    memory -= Number(input.value);
}

if (value === "MRC") {
    input.value = memory;
}


});

