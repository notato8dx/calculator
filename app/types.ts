export interface Operation {
	readonly symbol: string
	readonly symbolASCII: string
	readonly operate: (operands: [number, number]) => number
}

export interface PaperTapeEntry {
	operands: [number, number]
	operator: string
	value: number
	key: number
}