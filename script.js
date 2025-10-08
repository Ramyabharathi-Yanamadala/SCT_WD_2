const currentDisplay = document.getElementById('current');
const previousDisplay = document.getElementById('previous');
const buttons = document.querySelectorAll('.btn');

let current = '';
let previous = '';
let operator = null;

function updateDisplay() {
  currentDisplay.textContent = current || '0';
  previousDisplay.textContent = operator ? `${previous} ${operator}` : previous;
}

function clearAll() {
  current = '';
  previous = '';
  operator = null;
  updateDisplay();
}

function deleteLast() {
  current = current.toString().slice(0, -1);
  updateDisplay();
}

function appendNumber(num) {
  if (num === '.' && current.includes('.')) return;
  current += num;
  updateDisplay();
}

function chooseOperator(op) {
  if (current === '') return;
  if (previous !== '') compute();
  operator = op;
  previous = current;
  current = '';
  updateDisplay();
}

function compute() {
  const prev = parseFloat(previous);
  const curr = parseFloat(current);
  if (isNaN(prev) || isNaN(curr)) return;

  let result;
  switch (operator) {
    case '+': result = prev + curr; break;
    case '−': result = prev - curr; break;
    case '×': result = prev * curr; break;
    case '÷':
      if (curr === 0) {
        currentDisplay.textContent = 'Error';
        setTimeout(clearAll, 1500);
        return;
      }
      result = prev / curr;
      break;
    default:
      return;
  }

  current = result.toString();
  operator = null;
  previous = '';
  updateDisplay();
}

// Button click handling
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('num')) appendNumber(btn.textContent);
    else if (btn.classList.contains('operator')) chooseOperator(btn.textContent);
    else if (btn.classList.contains('equal')) compute();
    else if (btn.classList.contains('clear')) clearAll();
    else if (btn.classList.contains('del')) deleteLast();
  });
});

// Keyboard support
document.addEventListener('keydown', e => {
  if (!isNaN(e.key) || e.key === '.') appendNumber(e.key);
  if (['+', '-', '*', '/'].includes(e.key)) {
    const op = e.key === '/' ? '÷' : e.key === '*' ? '×' : e.key === '-' ? '−' : '+';
    chooseOperator(op);
  }
  if (e.key === 'Enter' || e.key === '=') compute();
  if (e.key === 'Backspace') deleteLast();
  if (e.key === 'Escape') clearAll();
});

updateDisplay();
