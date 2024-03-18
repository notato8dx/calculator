import Operation from './operation'

export default interface ButtonListProps {
	isOperationSelected: boolean,
	handleOperation: (setOperation: (operation: Operation) => void) => (operation: Operation) => void,
	handleNumber: (number: number) => void,
	handleClear: () => void,
	handleClearAll: () => void,
	handleValue: (getNewValue: (value: number) => number) => void
	handleEqual: (operation: Operation) => () => void
	handleDecimal: () => void
}