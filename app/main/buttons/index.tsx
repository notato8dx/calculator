import { useState } from 'react'
import * as operations from '../../operations'
import ButtonListProps from '../../button-list-props'
import Operation from '../../operation'

export default function Buttons({
	List,
	isOperationSelected,
	handleOperation,
	handleNumber,
	handleClear,
	handleClearAll,
	handleValue,
	handleEqual,
	handleDecimal
}: {
	List: React.FunctionComponent<ButtonListProps>,
	isOperationSelected: boolean,
	handleOperation: (setOperation: (operation: Operation) => void) => (operation: Operation) => void,
	handleNumber: (number: number) => void,
	handleClear: () => void,
	handleClearAll: () => void,
	handleValue: (getNewValue: (value: number) => number) => void
	handleEqual: (operation: Operation) => () => void
	handleDecimal: () => void
}) {
	const [operation, setOperation] = useState(operations.addition)

	return <List
		operation={isOperationSelected ? operation : undefined}
		operations={[operations.addition, operations.subtraction, operations.multiplication, operations.division]}
		handleOperationClick={handleOperation(setOperation)}
		handleNumberClick={handleNumber}
		handleClearClick={handleClear}
		handleClearAllClick={handleClearAll}
		handleValueClick={handleValue}
		handleEqualClick={handleEqual(operation)}
		handleDecimalClick={handleDecimal}
	/>
}