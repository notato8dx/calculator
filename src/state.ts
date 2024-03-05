function createOperation(symbol, func) {
	return { function: func, symbol }
}

export const operations = [
	createOperation('+', operands => operands[0] + operands[1]),
	createOperation('-', operands => operands[0] - operands[1]),
	createOperation('*', operands => operands[0] * operands[1]),
	createOperation('/', operands => operands[0] / operands[1])
]

export let canOverwrite = true

export function setCanOverwrite(value) {
	canOverwrite = value
}

