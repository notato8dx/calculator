import { useState } from 'react'
import Button from '../button'
import { Style } from '../utils'
import operations from '../../operations'
import { CalculatorButtonListProps } from '../../utils'

export default function BasicButtons({ areOperationsSelected, handleOperationClick, handleNumberClick, handleClearAllClick, handleClearClick, handleValueClick, handleEqualClick }: CalculatorButtonListProps) {	
	const [shouldClearAll, setShouldClearAll] = useState(true)

	const [addButton, subtractButton, multiplyButton, divideButton] = operations.map(({ symbol }, id) => {
		return <Button style={Style.Operation} isSelected={areOperationsSelected[id]} onClick={() => handleOperationClick(id)}>
			{symbol}
		</Button>
	})

	const numberButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, id) => {
		return <Button isLarge={id === 0} isBottomLeft={id === 0} style={Style.Number} onClick={() => {
			handleNumberClick(number)
			setShouldClearAll(false)
		}}>
			{number.toString(16).toUpperCase()}
		</Button>
	})

	return <>
		{shouldClearAll ? <Button style={Style.Value} onClick={handleClearAllClick}>
			AC
		</Button> : <Button style={Style.Value} onClick={() => {
			handleClearClick()
			setShouldClearAll(true)
		}}>
			C
		</Button>}

		<Button style={Style.Value} onClick={() => handleValueClick(value => -value)}>
			⁺⁄₋
		</Button>

		<Button style={Style.Value} onClick={() => handleValueClick(value => value / 100)}>
			%
		</Button>

		{divideButton}
		{numberButtons[7]}
		{numberButtons[8]}
		{numberButtons[9]}
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

		<Button style={Style.Number}>
			.
		</Button>

		<Button style={Style.Operation} onClick={handleEqualClick}>
			=
		</Button>
	</>
}