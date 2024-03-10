import BasicButtonGrid from './calculator/basic-button-grid'
import ProgrammerButtonGrid from './calculator/programmer-button-grid'
import ScientificButtonGrid from './calculator/scientific-button-grid'

export class Operation {
	readonly symbol
	readonly symbolASCII
	readonly function

	constructor(symbol: string, symbolASCII: string, func: (operands: number[]) => number) {
		this.symbol = symbol
		this.symbolASCII = symbolASCII
		this.function = func
	}
}

export interface PaperTapeEntry {
	operands: number[]
	operationId: number
	value: number
	key: number
}

export enum View {
	Basic,
	Scientific,
	Programmer
}

export const views = [
	{ name: 'Basic', columnCount: 4, component: BasicButtonGrid },
	{ name: 'Scientific', columnCount: 10, component: ScientificButtonGrid },
	{ name: 'Programmer', columnCount: 7, component: ProgrammerButtonGrid }
]

export const operations = [
	new Operation('+', '+', operands => operands[0] + operands[1]),
	new Operation('−', '-', operands => operands[0] - operands[1]),
	new Operation('×', '*', operands => operands[0] * operands[1]),
	new Operation('÷', '/', operands => operands[0] / operands[1])
]