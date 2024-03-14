import { useState } from 'react'
import useOperandId from './use-operand-id'
import useOperands from './use-operands'
import { PaperTapeEntry } from '../utils'
import views from '../views'
import operations from '../operations'
import './styles.css'

let canOverwrite = true

export default function Calculator({ displayOptions, viewId, addPaperTapeEntry }: { displayOptions: Intl.NumberFormatOptions, viewId: number, addPaperTapeEntry: (entry: Omit<PaperTapeEntry, 'key'>) => void }) {
	const [operandId, setOperandId] = useOperandId(() => {
		canOverwrite = true
	})
	const [operands, setOperand] = useOperands(operandId)
	const [operationId, setOperationId] = useState(0)

	const { columnCount, Buttons } = views[viewId]

	function setOperandAndOperandId(value: number, id: number) {
		setOperand(value, id)
		setOperandId(id)
	}

	return <>
		<div id='display'>
			{operands[operandId].toLocaleString(undefined, {
				...displayOptions,
				// @ts-expect-error
				signDisplay: 'negative'
			})}
		</div>

		<div id='buttons' style={{ gridTemplateColumns: `repeat(${columnCount}, 58px)` }}>
			<Buttons
				areOperationsSelected={operations.map((_, id) => {
					return operandId === 1 && operationId === id
				})}
				handleOperationClick={(id: number) => {
					setOperationId(id)
					setOperandAndOperandId(operands[0], 1)
				}}
				handleNumberClick={(number: number) => {
					if (canOverwrite) {
						setOperand(number)
						canOverwrite = false
					} else {
						setOperand(operands[operandId] * 10 + number)
					}
				}}
				handleClearClick={() => {
					setOperand(0)
			
					if (canOverwrite) {
						setOperandId(0)	
					}
				}}
				handleClearAllClick={() => {
					setOperand(0, 1)
					setOperandAndOperandId(0, 0)
				}}
				handleValueClick={(getNewValue: (value: number) => number) => {
					setOperand(getNewValue(operands[operandId]))
				}}
				handleEqualClick={() => {
					const value = operations[operationId].function(operands)
					addPaperTapeEntry({ operands, operationId, value })
					setOperandAndOperandId(value, 0)
				}} />
		</div>
	</>
}