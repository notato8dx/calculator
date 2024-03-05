function createOperation(symbol, func) {
	return { function: func, symbol }
}

export const operands = [0, 0]

export const operations = [
	createOperation('+', () => operands[0] + operands[1]),
	createOperation('-', () => operands[0] - operands[1]),
	createOperation('*', () => operands[0] * operands[1]),
	createOperation('/', () => operands[0] / operands[1])
]

export let operand = 0

export let canOverwrite = true

export function setOperand(newOperand) {
	operand = newOperand
	canOverwrite = true
}

export function setOperandValue(value, setDisplay) {
	operands[operand] = value
	setDisplay(value)
}

export function setCanOverwrite(value) {
	canOverwrite = value
}