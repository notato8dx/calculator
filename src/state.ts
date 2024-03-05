export const operands = [0, 0]

function createOperation(symbol, func) {
	return { function: func, symbol }
}

export const operations = [
	createOperation('+', () => operands[0] + operands[1]),
	createOperation('-', () => operands[0] - operands[1]),
	createOperation('*', () => operands[0] * operands[1]),
	createOperation('/', () => operands[0] / operands[1])
]

export let canOverwrite = true

export function setCanOverwrite(value) {
	canOverwrite = value
}

