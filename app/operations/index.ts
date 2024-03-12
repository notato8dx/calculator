class Operation {
	readonly symbol
	readonly symbolASCII
	readonly function

	constructor(symbol: string, symbolASCII: string, func: (operands: number[]) => number) {
		this.symbol = symbol
		this.symbolASCII = symbolASCII
		this.function = func
	}
}

export default [
	new Operation('+', '+', operands => operands[0] + operands[1]),
	new Operation('−', '-', operands => operands[0] - operands[1]),
	new Operation('×', '*', operands => operands[0] * operands[1]),
	new Operation('÷', '/', operands => operands[0] / operands[1])
]