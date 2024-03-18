import Operation from '../operation'

function createOperation(
	symbol: string,
	symbolASCII: string,
	operate: (operands: [number, number]) => number
): Operation {
	return { symbol, symbolASCII, operate }
}

export const addition = createOperation('+', '+', operands => operands[0] + operands[1])
export const subtraction = createOperation('−', '-', operands => operands[0] - operands[1])
export const multiplication = createOperation('×', '*', operands => operands[0] * operands[1])
export const division = createOperation('÷', '/', operands => operands[0] / operands[1])