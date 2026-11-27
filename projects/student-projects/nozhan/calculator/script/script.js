class Calculator {
            constructor() {
                this.number = "0";
                this.firstNum = null;
                this.operator = null;
                this.reset = false;
            }

            input(value) {
                if (value === "AC") {
                    this.number = "0";
                    this.firstNum = null;
                    this.operator = null;
                    this.reset = false;
                }

                else if (value === "DEL") {
                    this.number = this.number.length > 1
                        ? this.number.slice(0, -1) : "0";
                }

                else if (value === "+" || value === "-" ||
                         value === "*" || value === "/") {
                    this.firstNum = Number(this.number);
                    this.operator = value;
                    this.reset = true;
                }

                else if (value === "=") {
                    if (this.operator !== null) {
                        let secondNum = Number(this.number);
                        let result = this.calculate(secondNum);

                        this.number = String(result);
                        this.operator = null;
                        this.firstNum = null;
                        this.reset = true;
                    }
                }

                else if (value === "%") {
                    this.number = String(Number(this.number) / 100);
                }

                else {
                    if (this.reset) {
                        this.number = "0";
                        this.reset = false;
                    }

                    if (value === "." && this.number.includes(".")) return;

                    this.number = this.number === "0" && value !== "."
                        ? value : this.number + value;
                }

                screen.textContent = this.number;
            }
        }

        class plusCalculator extends Calculator {
            calculate(second) {
                if (this.operator === "+") return this.firstNum + second;
                if (this.operator === "-") return this.firstNum - second;
                if (this.operator === "*") return this.firstNum * second;
                if (this.operator === "/") {
                    return second === 0 ? "Error" : this.firstNum / second;
                }
            }
        }

        let screen = document.getElementById("screen");
        let calculator = new plusCalculator();

        document.querySelector(".buttons").addEventListener("click", function(event) {
            if (event.target.tagName === "BUTTON") {
                calculator.input(event.target.dataset.value);
            }
        });
