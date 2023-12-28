let primaryDisplay = document.querySelector('.display .primary');
let secondaryDisplay = document.querySelector('.display .secondary');

let firstInput = true;
let clearOnNextInput = false;
let currentOperation = '';
let previousOperation = '';

function getPrimaryInput() {
  return parseInt(primaryDisplay.textContent || 0);
}

function getSecondaryInput() {
  return parseInt(secondaryDisplay.textContent
    .slice(0, secondaryDisplay.textContent.length-2));
}

function setPrimaryInput(input) {
  primaryDisplay.textContent = input;
}

function setSecondaryInput(input) {
  secondaryDisplay.textContent = `${input} ${formatOperation(currentOperation)}`;
}

function formatOperation(operation) {
  switch (operation) {
    case 'plus':
      return '+';
    case 'minus':
      return '-';
    case 'multiply':
      return '×';
    case 'divide':
      return '÷';
  }
}

function clearCalculator() {
  primaryDisplay.textContent = '';
  secondaryDisplay.textContent = 0;
  currentOperation = '';
  previousOperation = '';
  firstInput = true;
}

function processOperations(operation) {
  clearOnNextInput = true;
  let mathError = false;
  let calculated = getSecondaryInput() || 0;
  let toProcess = getPrimaryInput();
  if (firstInput) {
    if (operation == 'equal') {
      secondaryDisplay.textContent = getPrimaryInput();
      return;
    } else {
      setSecondaryInput(getPrimaryInput());
    }
    firstInput = false;
    clearOnNextInput = true;
    return;
  }
  if (currentOperation != previousOperation) {
    setSecondaryInput(getSecondaryInput());
    return;
  }
  switch (currentOperation) {
    case 'plus':
      calculated += toProcess;
      break;
    case 'minus':
      calculated -= toProcess;
      break;
    case 'multiply':
      calculated *= toProcess;
      break;
    case 'divide':
      calculated /= toProcess;
      break;
  }
  if (calculated == 'Infinity') {
    mathError = true;
  }
  setSecondaryInput(calculated);
  if (mathError) {
    clearCalculator();
    setPrimaryInput('Math Error');
  }
  clearOnNextInput = true;
}

function processNumberInput(number) {
  if (primaryDisplay.textContent.length >= 23) return;
  if (clearOnNextInput) {
    primaryDisplay.textContent = '';
    clearOnNextInput = false;
  }
  primaryDisplay.textContent += number.toString();
}

function processOperationInput(operation) {
  if (operation != 'equal') {
    currentOperation = operation;
  } else {
    currentOperation = previousOperation;
  }
  if (operation == 'clear') return clearCalculator();
  console.log('current:', currentOperation);
  console.log('previous:', previousOperation);
  processOperations(operation);
  previousOperation = currentOperation;
  currentOperation = '';
  console.log('current:', currentOperation);
  console.log('previous:', previousOperation);
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
