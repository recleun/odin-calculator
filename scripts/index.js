let display = document.querySelector('.display');

let operationArray = [];

function clearCalculator() {
  operationArray = [];
  display.textContent = 0;
}

function processOperations() {
  let calculated = 0;
  let currentOperation = '';
  let mathError = false;
  for (let i = 0; i < operationArray.length; i++) {
    if (i % 2 != 0) {
      currentOperation = operationArray[i];
    } else {
      if (currentOperation) {
        switch (currentOperation) {
          case 'plus':
            calculated = calculated + operationArray[i];
            break;
          case 'minus':
            calculated -= operationArray[i];
            break;
          case 'multiply':
            calculated *= operationArray[i];
            break;
          case 'divide':
            calculated /= operationArray[i];
            if (calculated = 'Infinity') {
              mathError = true;
            }
            break;
        }
      } else {
        calculated = operationArray[i];
      }
    }
  }
  operationArray = [];
  display.textContent = mathError ? 'Math Error' : calculated;
}

function processNumberInput(number) {
  if (display.textContent.length >= 23) return;
  if (display.textContent == 0 || display.textContent == 'Math Error') {
    display.textContent = number.toString();
  } else {
    display.textContent += number.toString();
  }
}

function processOperationInput(operation) {
  if (operation == 'clear') return clearCalculator();
  if (operation == 'equal') {
    operationArray.push(parseInt(display.textContent));
    return processOperations();
  };
  operationArray.push(parseInt(display.textContent));
  operationArray.push(operation);
  display.textContent = 0;
}

const operations = document.querySelectorAll('.special-button');

operations.forEach(operation => {
  operation.addEventListener('click', () => {
    processOperationInput(operation.getAttribute('id'));
  });
});

const numbers = document.querySelectorAll('.normal-button');

numbers.forEach(number => {
  number.addEventListener('click', () => {
    processNumberInput(number.textContent);
  });
});
