export default interface Operation {
	readonly symbol: string
	readonly symbolASCII: string
	readonly function: (operands: [number, number]) => number
}