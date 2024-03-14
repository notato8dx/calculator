export default interface ButtonListProps {
	areOperationsSelected: boolean[]
	handleOperationClick: (id: number) => void
	handleNumberClick: (number: number) => void
	handleClearAllClick: () => void
	handleClearClick: () => void
	handleValueClick: (getNewValue: (value: number) => number) => void
	handleEqualClick: () => void
}