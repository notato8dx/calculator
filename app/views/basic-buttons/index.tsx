import { useState } from 'react'
import Button from '../button'
import Operation from '../../operation'

const operations: [Operation, Operation, Operation, Operation] = [
	{
		symbol: '+',
		symbolASCII: '+',
		operate: operands => operands[0] + operands[1]
	},
	{
		symbol: '−',
		symbolASCII: '-',
		operate: operands => operands[0] - operands[1]
	},
	{
		symbol: '×',
		symbolASCII: '*', 
		operate: operands => operands[0] * operands[1]
	},
	{
		symbol: '÷',
		symbolASCII: '/',
		operate: operands => operands[0] / operands[1]
	}
]

export default function BasicButtons({
	isOperationSelected,
	handleOperation,
	handleNumber,
	handleClear,
	handleClearAll,
	handleValue,
	handleEqual,
	handleDecimal
}: {
	isOperationSelected: boolean,
	handleOperation: (setOperation: (operation: Operation) => void) => (operation: Operation) => void,
	handleNumber: (number: number) => void,
	handleClear: () => void,
	handleClearAll: () => void,
	handleValue: (getNewValue: (value: number) => number) => void
	handleEqual: (operation: Operation) => () => void
	handleDecimal: () => void
}) {
	const [operation, setOperation] = useState(operations[0])
	const [shouldClearAll, setShouldClearAll] = useState(true)

	const [addButton, subtractButton, multiplyButton, divideButton] = operations.map(o => {
		return <Button variant='operation' isSelected={isOperationSelected && o == operation} onClick={() => handleOperation(setOperation)(o)}>
			{o.symbol}
		</Button>
	})

	const numberButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, id) => {
		return <Button isLarge={id == 0} isBottomLeft={id == 0} variant='number' onClick={() => {
			handleNumber(number)
			setShouldClearAll(false)
		}}>
			{number.toString(16).toUpperCase()}
		</Button>
	})

	return <>
		{shouldClearAll ?
			<Button variant='value' onClick={handleClearAll}>
				AC
			</Button>
		:
			<Button variant='value' onClick={() => {
				handleClear()
				setShouldClearAll(true)
			}}>
				C
			</Button>
		}

		<Button variant='value' onClick={() => handleValue(value => -value)}>
			⁺⁄₋
		</Button>

		<Button variant='value' onClick={() => handleValue(value => value / 100)}>
			%
		</Button>

		{divideButton}
		{numberButtons[7]}
		{numberButtons[8]}
		{numberButtons[9]}
		{numberButtons[29]}
		{multiplyButton}
		{numberButtons[4]}
		{numberButtons[5]}
		{numberButtons[6]}
		{subtractButton}
		{numberButtons[1]}
		{numberButtons[2]}
		{numberButtons[3]}
		{addButton}
		{numberButtons[0]}

		<Button variant='number' onClick={handleDecimal}>
			.
		</Button>

		<Button variant='operation' onClick={handleEqual(operation)}>
			=
		</Button>
	</>
}