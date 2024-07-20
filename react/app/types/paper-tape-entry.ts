export default interface PaperTapeEntry {
	readonly operands: [number, number]
	readonly operator: string
	readonly value: number
	readonly key: number
}