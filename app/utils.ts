export interface CalculatorButtonListProps {
	areOperationsSelected: boolean[]
	handleOperationClick: (id: number) => void
	handleNumberClick: (number: number) => void
	handleClearAllClick: () => void
	handleClearClick: () => void
	handleValueClick: (getNewValue: (value: number) => number) => void
	handleEqualClick: () => void
}

export interface PaperTapeEntry {
	operands: number[]
	operationId: number
	value: number
}

export interface KeyedPaperTapeEntry extends PaperTapeEntry {
	key: number
}