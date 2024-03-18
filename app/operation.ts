export default interface Operation {
	readonly symbol: string
	readonly symbolASCII: string
	readonly operate: (operands: [number, number]) => number
}