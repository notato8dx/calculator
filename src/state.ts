function createOperand() {
	return { value: 0, canOverwrite: true }
}

function createOperation(symbol, func) {
	return { function: func, symbol }
}

export const operands = [createOperand(), createOperand()]

export const operations = [
	createOperation('+', () => operands[0].value + operands[1].value),
	createOperation('-', () => operands[0].value - operands[1].value),
	createOperation('*', () => operands[0].value * operands[1].value),
	createOperation('/', () => operands[0].value / operands[1].value)
]

export let operand = 0

export let operation = 0

export function setOperand(newOperand) {
	operand = newOperand
	operands[operand].canOverwrite = true
}

export function setOperandValue(value, setDisplay) {
	operands[operand].value = value
	setDisplay(value)
}

export function setOperation(newOperation) {
	operation = newOperation
}