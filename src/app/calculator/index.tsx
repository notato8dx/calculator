import { useState } from 'react'
import { canOverwrite, setCanOverwrite } from './utils'
import { operations } from '../utils'
import './styles.css'

export default function Calculator({ localeStringOptions, view: { component: ButtonGrid, columnCount }, addPaperTapeEntry }) {
	const [operandId, setOperandId] = useState(0)
	const [operands, setOperands] = useState([0, 0])
	const [operationId, setOperationId] = useState(0)
	const [shouldClearAll, setShouldClearAll] = useState(true)

	function handleSetOperandId(id: number) {
		setOperandId(id)
		setCanOverwrite(true)
	}

	function setOperand(value: number, id: number = operandId) {
		setOperands([
			...operands.slice(0, id),
			value,
			...operands.slice(id + 1)
		])
	}

	function setOperandAndOperandId(value: number, id: number) {
		setOperand(value, id)
		handleSetOperandId(id)
	}

	function handleOperationClick(id: number) {
		setOperationId(id)
		setOperandAndOperandId(operands[0], 1)
	}

	function handleNumberClick(number: number) {
		if (canOverwrite) {
			setOperand(number)
			setCanOverwrite(false)
		} else {
			setOperand(operands[operandId] * 10 + number)
		}

		setShouldClearAll(false)
	}

	function handleClearAllClick() {
		setOperand(0, 1)
		setOperandAndOperandId(0, 0)
	}

	function handleClearClick() {
		setOperand(0)

		if (canOverwrite) {
			handleSetOperandId(0)	
		}
		
		setShouldClearAll(true)
	}

	function handleValueClick(getNewValue: (value: number) => number) {
		setOperand(getNewValue(operands[operandId]))
	}

	function handleEqualClick() {
		const value = operations[operationId].function(operands)
		addPaperTapeEntry(operands, operationId, value)
		setOperandAndOperandId(value, 0)
	}

	const areOperationsSelected = operations.map((_, id) => operandId === 1 && operationId === id)

	return <div id='calculator'>
		<div id='display'>
			{operands[operandId].toLocaleString(undefined, {
				...localeStringOptions,
				signDisplay: 'negative'
			})}
		</div>

		<div id='buttons' style={{ gridTemplateColumns: `repeat(${columnCount}, 58px)` }}>
			<ButtonGrid areOperationsSelected={areOperationsSelected} handleOperationClick={handleOperationClick} handleNumberClick={handleNumberClick} handleClearAllClick={handleClearAllClick} handleClearClick={handleClearClick} handleValueClick={handleValueClick} handleEqualClick={handleEqualClick} shouldClearAll={shouldClearAll} />
		</div>
	</div>
}