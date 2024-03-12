import { useState } from 'react'
import operations from '../operations'
import './styles.css'

let canOverwrite = true

function setCanOverwrite(value: boolean) {
	canOverwrite = value
}

export default function Calculator({ displayOptions, view: { Buttons, columnCount }, addPaperTapeEntry }) {
	const [operandId, setOperandId] = useState(0)
	const [operands, setOperands] = useState([0, 0])
	const [operationId, setOperationId] = useState(0)

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
	}

	function handleValueClick(getNewValue: (value: number) => number) {
		setOperand(getNewValue(operands[operandId]))
	}

	function handleEqualClick() {
		const value = operations[operationId].function(operands)
		addPaperTapeEntry({ operands, operationId, value })
		setOperandAndOperandId(value, 0)
	}

	const areOperationsSelected = operations.map((_, id) => operandId === 1 && operationId === id)

	return <div id='calculator'>
		<div id='display'>
			{operands[operandId].toLocaleString(undefined, {
				...displayOptions,
				signDisplay: 'negative'
			})}
		</div>

		<div id='buttons' style={{ gridTemplateColumns: `repeat(${columnCount}, 58px)` }}>
			<Buttons areOperationsSelected={areOperationsSelected} handleOperationClick={handleOperationClick} handleNumberClick={handleNumberClick} handleClearAllClick={handleClearAllClick} handleClearClick={handleClearClick} handleValueClick={handleValueClick} handleEqualClick={handleEqualClick} />
		</div>
	</div>
}