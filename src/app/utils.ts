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
	operation: Operation
	value: number
	key: number
}

export enum Style {
	Operation,
	Value,
	Number
}

export enum View {
	Basic,
	Scientific,
	Programmer
}

export let canOverwrite = true

export function setCanOverwrite(value: boolean) {
	canOverwrite = value
}