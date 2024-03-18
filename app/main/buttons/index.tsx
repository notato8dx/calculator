import { useState } from 'react'
import * as operations from '../../operations'
import ButtonList from '../../button-list'
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
	List: ButtonList,
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