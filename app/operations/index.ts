import IOperation from '../operation'

class Operation implements IOperation {
	readonly symbol
	readonly symbolASCII
	readonly function

	constructor(
		symbol: string,
		symbolASCII: string,
		func: (operands: [number, number]) => number
	) {
		this.symbol = symbol
		this.symbolASCII = symbolASCII
		this.function = func
	}
}

export const addition = new Operation('+', '+', operands => operands[0] + operands[1])
export const subtraction = new Operation('−', '-', operands => operands[0] - operands[1])
export const multiplication = new Operation('×', '*', operands => operands[0] * operands[1])
export const division = new Operation('÷', '/', operands => operands[0] / operands[1])