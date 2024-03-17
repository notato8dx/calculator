import Operation from './operation'

export default interface ButtonListProps {
	operation?: Operation
	operations: Operation[]
	handleOperationClick: (operation: Operation) => void
	handleNumberClick: (number: number) => void
	handleClearAllClick: () => void
	handleClearClick: () => void
	handleValueClick: (getNewValue: (value: number) => number) => void
	handleEqualClick: () => void
}