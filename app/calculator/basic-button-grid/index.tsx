import { useState } from 'react'
import SymbolButton from '../symbol-button'
import { Style } from '../utils'
import { ButtonGridProperties, operations } from '../../utils'

export default function BasicButtonGrid({ areOperationsSelected, handleOperationClick, handleNumberClick, handleClearAllClick, handleClearClick, handleValueClick, handleEqualClick }: ButtonGridProperties) {	
	const [shouldClearAll, setShouldClearAll] = useState(true)

	const [addButton, subtractButton, multiplyButton, divideButton] = operations.map(({ symbol }, id) => {
		return <SymbolButton style={Style.Operation} isSelected={areOperationsSelected[id]} onClick={() => handleOperationClick(id)}>
			{symbol}
		</SymbolButton>
	})

	const numberButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, id) => {
		return <SymbolButton isLarge={id === 0} isBottomLeft={id === 0} style={Style.Number} onClick={() => {
			handleNumberClick(number)
			setShouldClearAll(false)
		}}>
			{number.toString(16).toUpperCase()}
		</SymbolButton>
	})

	return <>
		{shouldClearAll ? <SymbolButton style={Style.Value} onClick={handleClearAllClick}>
			AC
		</SymbolButton> : <SymbolButton style={Style.Value} onClick={() => {
			handleClearClick()
			setShouldClearAll(true)
		}}>
			C
		</SymbolButton>}

		<SymbolButton style={Style.Value} onClick={() => handleValueClick(value => -value)}>
			⁺⁄₋
		</SymbolButton>

		<SymbolButton style={Style.Value} onClick={() => handleValueClick(value => value / 100)}>
			%
		</SymbolButton>

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

		<SymbolButton style={Style.Number}>
			.
		</SymbolButton>

		<SymbolButton style={Style.Operation} onClick={handleEqualClick}>
			=
		</SymbolButton>
	</>
}