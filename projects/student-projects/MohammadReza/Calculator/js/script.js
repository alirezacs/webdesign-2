
let display = document.getElementById("display");
let expression = document.getElementById("expression");

let buttons = document.querySelectorAll("button");

let text = "";

for (let i = 0; i < buttons.length; i++) {

    buttons[i].onclick = function () {

        let action = buttons[i].getAttribute("data-action");
        let value = buttons[i].getAttribute("data-value");

  
        if (value != null) {

            text += value;
            display.innerText = text;

        }


        if (action == "clear") {

            text = "";
            display.innerText = "0";
            expression.innerText = "";

        }

        if (action == "delete") {

            text = text.slice(0, -1);
            display.innerText = text || "0";

        }

        if (action == "equals") {

            try {

                expression.innerText = text + " =";

                let result = eval(text);

                display.innerText = result;
                text = String(result);

            } catch {

                display.innerText = "Error";
                text = "";

            }

        }

        if (action == "percent") {

            text = String(eval(text) / 100);
            display.innerText = text;

        }

    };

}
