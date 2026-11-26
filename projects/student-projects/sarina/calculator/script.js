"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const resultEl = document.getElementById("result");
  const expressionEl = document.getElementById("expression");
  const keysEl = document.getElementById("keys");
  const historyListEl = document.getElementById("historyList");
  const clearHistoryBtn = document.getElementById("clearHistory");
  const themeBtn = document.getElementById("themeBtn");
  const themeIcon = document.getElementById("themeIcon");

  if (
    !resultEl ||
    !expressionEl ||
    !keysEl ||
    !historyListEl ||
    !clearHistoryBtn ||
    !themeBtn ||
    !themeIcon
  ) {
    console.error(
      "Calculator could not start: one or more HTML elements are missing."
    );
    return;
  }

  let current = "0";
  let previous = null;
  let operator = null;
  let waitingForOperand = false;
  let justCalculated = false;
  let lastExpression = "";

  const history = [];

  const symbols = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷"
  };

  function cleanNumber(value) {
    if (!Number.isFinite(value)) {
      return "Error";
    }

    const rounded = Number.parseFloat(value.toPrecision(12));

    return Object.is(rounded, -0) ? "0" : String(rounded);
  }

  function displayNumber(value) {
    if (value === "Error") {
      return value;
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
      return value;
    }

    return number.toLocaleString("en-US", {
      maximumFractionDigits: 10,
      useGrouping: true
    });
  }

  function updateDisplay() {
    resultEl.textContent = displayNumber(current);

    if (operator !== null && previous !== null) {
      expressionEl.textContent =
       ` ${displayNumber(cleanNumber(previous))} ${symbols[operator]}`;
    } else {
      expressionEl.textContent = lastExpression || "\u00a0";
    }
  }

  function resetForError() {
    current = "Error";
    previous = null;
    operator = null;
    waitingForOperand = true;
    justCalculated = true;
    lastExpression = "Something went wrong";

    updateDisplay();
  }

  function appendDigit(digit) {
    if (
      current === "Error" ||
      waitingForOperand ||
      justCalculated
    ) {
      current = digit;
      waitingForOperand = false;
      justCalculated = false;
      lastExpression = "";
    } else if (
      current.replace("-", "").replace(".", "").length < 14
    ) {
      current = current === "0" ? digit : current + digit;
    }

    updateDisplay();
  }

  function appendDecimal() {
    if (
      current === "Error" ||
      waitingForOperand ||
      justCalculated
    ) {
      current = "0.";
      waitingForOperand = false;
      justCalculated = false;
      lastExpression = "";
    } else if (!current.includes(".")) {
      current += ".";
    }

    updateDisplay();
  }

  function calculateValues(a, op, b) {
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "*") return a * b;

    if (op === "/") {
      return b === 0 ? NaN : a / b;
    }

    return b;
  }

  function chooseOperator(nextOperator) {
    if (current === "Error") {
      return;
    }

    const input = Number(current);

    if (
      operator !== null &&
      !waitingForOperand &&
      previous !== null
    ) {
      const computed = calculateValues(
        previous,
        operator,
        input
      );

      if (!Number.isFinite(computed)) {
        resetForError();
        return;
      }

      current = cleanNumber(computed);
    }

    previous = Number(current);
    operator = nextOperator;
    waitingForOperand = true;
    justCalculated = false;
    lastExpression = "";

    updateDisplay();
  }

  function renderHistory() {
    historyListEl.replaceChildren();

    if (history.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";

      const icon = document.createElement("span");
      icon.className = "empty-icon";
      icon.textContent = "↗";

      const message = document.createElement("p");
      message.textContent =
        "Your calculations will appear here.";

      empty.append(icon, message);
      historyListEl.append(empty);

      return;
    }

    history.slice().reverse().forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "history-item";

      const expression = document.createElement("span");
      expression.className = "history-expression";
      expression.textContent = item.expression;

      const answer = document.createElement("span");
      answer.className = "history-result";
      answer.textContent = displayNumber(item.result);

      button.append(expression, answer);

      button.addEventListener("click", () => {
        current = item.result;
        previous = null;
        operator = null;
        waitingForOperand = false;
        justCalculated = true;
        lastExpression = item.expression + " =";

        updateDisplay();
      });

      historyListEl.append(button);
    });
  }

  function calculate() {
    if (
      operator === null ||
      previous === null ||
      waitingForOperand ||
      current === "Error"
    ) {
      return;
    }

    const first = previous;
    const second = Number(current);
    const op = operator;

    const expressionText =
      `${displayNumber(cleanNumber(first))}`  +
      `${symbols[op]}`  +
      `${displayNumber(cleanNumber(second))}`;

    const value = calculateValues(first, op, second);

    if (!Number.isFinite(value)) {
      resetForError();
      return;
    }

    current = cleanNumber(value);
    lastExpression = expressionText + " =";

    history.push({
      expression: expressionText,
      result: current
    });

    if (history.length > 30) {
      history.shift();
    }

    previous = null;
    operator = null;
    waitingForOperand = false;
    justCalculated = true;

    updateDisplay();
    renderHistory();
  }

  function clearAll() {
    current = "0";
    previous = null;
    operator = null;
    waitingForOperand = false;
    justCalculated = false;
    lastExpression = "";

    updateDisplay();
  }

  function toggleSign() {
    if (current === "Error" || Number(current) === 0) {
      return;
    }

    current = current.startsWith("-")
      ? current.slice(1)
      : "-" + current;

    updateDisplay();
  }

  function percent() {
    if (current === "Error") {
      return;
    }

    current = cleanNumber(Number(current) / 100);

    updateDisplay();
  }

  function backspace() {
    if (
      current === "Error" ||
      waitingForOperand ||
      justCalculated
    ) {
      clearAll();
      return;
    }

    if (
      current.length <= 1 ||
      (current.length === 2 && current.startsWith("-"))
    ) {
      current = "0";
    } else {
      current = current.slice(0, -1);
    }

    updateDisplay();
  }

  function handleButton(button) {
    if (button.dataset.digit !== undefined) {
      appendDigit(button.dataset.digit);
      return;
    }

    if (button.dataset.op) {
      chooseOperator(button.dataset.op);
      return;
    }

    switch (button.dataset.action) {
      case "clear":
        clearAll();
        break;

      case "sign":
        toggleSign();
        break;

      case "percent":
        percent();
        break;

      case "decimal":
        appendDecimal();
        break;

      case "backspace":
        backspace();
        break;

      case "equals":
        calculate();
        break;
    }
  }

  keysEl.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (button && keysEl.contains(button)) {
      handleButton(button);
    }
  });

  clearHistoryBtn.addEventListener("click", () => {
    history.length = 0;
    renderHistory();
  });

  themeBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");

    themeIcon.textContent = isLight ? "☀" : "☾";
  });
  document.addEventListener("keydown", (event) => {
    if (/^[0-9]$/.test(event.key)) {
      appendDigit(event.key);
    } else if (
      event.key === "." ||
      event.key === ","
    ) {
      appendDecimal();
    } else if (
      ["+", "-", "*", "/"].includes(event.key)
    ) {
      chooseOperator(event.key);
    } else if (
      event.key === "Enter" ||
      event.key === "="
    ) {
      event.preventDefault();
      calculate();
    } else if (event.key === "Backspace") {
      backspace();
    } else if (
      event.key === "Escape" ||
      event.key === "Delete"
    ) {
      clearAll();
    } else if (event.key === "%") {
      percent();
    }
  });

  updateDisplay();
  renderHistory();
});