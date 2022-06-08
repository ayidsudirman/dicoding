const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

updateDisplay = () => {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
};

clearCalculator = () => {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
};

inputDigit = (digit) => {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
};

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
  button.addEventListener("click", (e) => {
    const target = e.target;

    // clear display number
    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    // negatify the number
    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    // do calculation
    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      return;
    }

    // perform calculation
    if (target.classList.contains("equal")) {
      performCalculation();
      updateDisplay();
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}


inverseNumber = () => {
  if (calculator.displayNumber === "0") {
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
};

handleOperator = (operator) => {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    // reset display for waiting second number
    calculator.displayNumber = "0";
  } else {
    alert("Operator sudah ditetapkan");
  }
};

performCalculation = () => {
  // check calculator has value: firstNumber and operator
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda belum memasukkan angka / menetapkan  operator !");
    return;
  }

  let result = 0;
  if (calculator.operator === "+") {
    result =
      parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  calculator.displayNumber = result;
};


