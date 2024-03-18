import { useState } from 'react'
import Button from '../button'
import ButtonListProps from '../../button-list-props'

export default function BasicButtons({
	operation,
	operations,
	handleOperationClick,
	handleNumberClick,
	handleClearAllClick,
	handleClearClick,
	handleValueClick,
	handleEqualClick,
	handleDecimalClick
}: ButtonListProps) {
	const [shouldClearAll, setShouldClearAll] = useState(true)

	const [addButton, subtractButton, multiplyButton, divideButton] = operations.map(o => {
		return <Button variant='operation' isSelected={o === operation} onClick={() => handleOperationClick(o)}>
			{o.symbol}
		</Button>
	})

	const numberButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, id) => {
		return <Button isLarge={id === 0} isBottomLeft={id === 0} variant='number' onClick={() => {
			handleNumberClick(number)
			setShouldClearAll(false)
		}}>
			{number.toString(16).toUpperCase()}
		</Button>
	})

	return <>
		{shouldClearAll ?
			<Button variant='value' onClick={handleClearAllClick}>
				AC
			</Button>
		:
			<Button variant='value' onClick={() => {
				handleClearClick()
				setShouldClearAll(true)
			}}>
				C
			</Button>
		}

		<Button variant='value' onClick={() => handleValueClick(value => -value)}>
			⁺⁄₋
		</Button>

		<Button variant='value' onClick={() => handleValueClick(value => value / 100)}>
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

		<Button variant='number' onClick={handleDecimalClick}>
			.
		</Button>

		<Button variant='operation' onClick={handleEqualClick}>
			=
		</Button>
	</>
}