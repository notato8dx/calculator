import BasicButtonGrid from './calculator/basic-button-grid'
import ProgrammerButtonGrid from './calculator/programmer-button-grid'
import ScientificButtonGrid from './calculator/scientific-button-grid'

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

class View {
	readonly name
	readonly columnCount
	readonly component

	constructor(name: string, columnCount: number, component: (properties: ButtonGridProperties) => JSX.Element) {
		this.name = name
		this.columnCount = columnCount
		this.component = component
	}
}

export interface ButtonGridProperties {
	areOperationsSelected: boolean[]
	handleOperationClick: (id: number) => void
	handleNumberClick: (number: number) => void
	handleClearAllClick: () => void
	handleClearClick: () => void
	handleValueClick: (getNewValue: (value: number) => number) => void
	handleEqualClick: () => void
}

export interface PaperTapeData {
	operands: number[]
	operationId: number
	value: number
}

export interface PaperTapeEntry extends PaperTapeData {
	key: number
}

export const views = [
	new View('Basic', 4, BasicButtonGrid),
	new View('Scientific', 10, ScientificButtonGrid),
	new View('Programmer', 7, ProgrammerButtonGrid)
]

export const operations = [
	new Operation('+', '+', operands => operands[0] + operands[1]),
	new Operation('−', '-', operands => operands[0] - operands[1]),
	new Operation('×', '*', operands => operands[0] * operands[1]),
	new Operation('÷', '/', operands => operands[0] / operands[1])
]