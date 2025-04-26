// Math Functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return "Nice try 🙃";
  return a / b;
}

// Operate Function
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return null;
  }
}

// Variables
let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetScreen = false;

const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const decimalButton = document.getElementById('decimal');
const backspaceButton = document.getElementById('backspace');

// Event Listeners
numberButtons.forEach(button =>
  button.addEventListener('click', () => appendNumber(button.dataset.number))
);
operatorButtons.forEach(button =>
  button.addEventListener('click', () => setOperator(button.dataset.operator))
);
equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
decimalButton.addEventListener('click', appendDecimal);
backspaceButton.addEventListener('click', backspace);

window.addEventListener('keydown', handleKeyboardInput);

// Functions
function appendNumber(number) {
  if (display.textContent === "0" || shouldResetScreen) resetScreen();
  display.textContent += number;
}

function resetScreen() {
  display.textContent = '';
  shouldResetScreen = false;
}

function clear() {
  display.textContent = '0';
  firstNumber = '';
  secondNumber = '';
  currentOperator = null;
}

function appendDecimal() {
  if (shouldResetScreen) resetScreen();
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstNumber = display.textContent;
  currentOperator = operator;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;
  if (currentOperator === '/' && display.textContent === '0') {
    display.textContent = "Nice try 🙃";
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    return;
  }
  secondNumber = display.textContent;
  display.textContent = roundResult(operate(currentOperator, firstNumber, secondNumber));
  firstNumber = display.textContent;
  currentOperator = null;
}

function roundResult(number) {
  if (typeof number === 'string') return number; // for "Nice try 🙃"
  return Math.round(number * 1000) / 1000;
}

function backspace() {
  display.textContent = display.textContent.toString().slice(0, -1) || '0';
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === '.') appendDecimal();
  if (e.key === '=' || e.key === 'Enter') evaluate();
  if (e.key === 'Backspace') backspace();
  if (e.key === 'Escape') clear();
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setOperator(e.key);
}
