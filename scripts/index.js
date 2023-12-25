let primaryDisplay = document.querySelector('.display .primary');
let secondaryDisplay = document.querySelector('.display .secondary');

let operationArray = [];

function clearCalculator() {
  operationArray = [];
  primaryDisplay.textContent = 0;
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
            if (calculated == 'Infinity') {
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
  primaryDisplay.textContent = mathError ? 'Math Error' : calculated;
}

function processNumberInput(number) {
  if (primaryDisplay.textContent.length >= 23) return;
  if (primaryDisplay.textContent == 0 || primaryDisplay.textContent == 'Math Error') {
    primaryDisplay.textContent = number.toString();
  } else {
    primaryDisplay.textContent += number.toString();
  }
}

function processOperationInput(operation) {
  if (operation == 'clear') return clearCalculator();
  if (operation == 'equal') {
    operationArray.push(parseInt(primaryDisplay.textContent));
    return processOperations();
  };
  operationArray.push(parseInt(primaryDisplay.textContent));
  operationArray.push(operation);
  primaryDisplay.textContent = 0;
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
