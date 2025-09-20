
        let display = document.getElementById('display');
        let currentInput = '0';
        let previousInput = '';
        let operation = null;
        let shouldResetDisplay = false;

        function updateDisplay() {
            display.textContent = currentInput;
            display.classList.add('active');
            setTimeout(() => display.classList.remove('active'), 100);
        }

        function clearDisplay() {
            currentInput = '0';
            previousInput = '';
            operation = null;
            shouldResetDisplay = false;
            updateDisplay();
            addRipple(event);
        }

        function deleteLast() {
            if (currentInput !== '0') {
                currentInput = currentInput.slice(0, -1);
                if (currentInput === '') {
                    currentInput = '0';
                }
                updateDisplay();
            }
            addRipple(event);
        }

        function appendNumber(num) {
            if (shouldResetDisplay) {
                currentInput = '0';
                shouldResetDisplay = false;
            }
            
            if (currentInput === '0') {
                currentInput = num;
            } else if (currentInput.length < 12) {
                currentInput += num;
            }
            updateDisplay();
            addRipple(event);
        }

        function appendDecimal() {
            if (shouldResetDisplay) {
                currentInput = '0';
                shouldResetDisplay = false;
            }
            
            if (!currentInput.includes('.')) {
                currentInput += '.';
                updateDisplay();
            }
            addRipple(event);
        }

        function appendOperator(op) {
            if (operation !== null && !shouldResetDisplay) {
                calculate();
            }
            
            previousInput = currentInput;
            operation = op;
            shouldResetDisplay = true;
            addRipple(event);
        }

        function calculate() {
            if (operation === null || previousInput === '') {
                return;
            }
            
            let result;
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);
            
            switch (operation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        result = 'Error';
                    } else {
                        result = prev / current;
                    }
                    break;
                default:
                    return;
            }
            
            if (result === 'Error') {
                currentInput = 'Error';
            } else {
                // Format the result to avoid floating point issues
                currentInput = parseFloat(result.toFixed(10)).toString();
                
                // Limit display length
                if (currentInput.length > 12) {
                    currentInput = parseFloat(currentInput).toExponential(5);
                }
            }
            
            operation = null;
            previousInput = '';
            shouldResetDisplay = true;
            updateDisplay();
            addRipple(event);
        }

        // Add ripple effect on button click
        function addRipple(event) {
            if (!event || !event.target) return;
            
            const button = event.target;
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        }

        // Keyboard support
        document.addEventListener('keydown', (event) => {
            if (event.key >= '0' && event.key <= '9') {
                appendNumber(event.key);
            } else if (event.key === '.') {
                appendDecimal();
            } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
                appendOperator(event.key);
            } else if (event.key === 'Enter' || event.key === '=') {
                calculate();
            } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
                clearDisplay();
            } else if (event.key === 'Backspace') {
                deleteLast();
            }
        });