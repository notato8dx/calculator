import { useState } from 'react'
import { setCanOverwrite } from './utils.ts'
import { views } from '../utils'

export default function Calculator({ decimalPlaces, isShowingSeparators, view, paperTapeHistory, setPaperTapeHistory }: { decimalPlaces: number, isShowingSeparators: boolean, view: number }) {
	const [operandId, setOperandId] = useState(0)
	const [operands, setOperands] = useState([0, 0])
	const [operationId, setOperationId] = useState(0)
	const [shouldClearAll, setShouldClearAll] = useState(true)

	function handleSetOperandId(operandId: number) {
		setOperandId(operandId)
		setCanOverwrite(true)
	}

	function setOperand(operandId: number, value: number) {
		setOperands([
			...operands.slice(0, operandId),
			value,
			...operands.slice(operandId + 1)
		])
	}

	function setOperandAndOperandId(operandId: number, value: number) {
		setOperand(operandId, value)
		handleSetOperandId(operandId)
	}
	
	const ButtonGrid = views[view].component

	return <div id='calculator'>
		<div id='display'>
			{operands[operandId].toLocaleString(undefined, {
				maximumFractionDigits: decimalPlaces,
				useGrouping: isShowingSeparators,
				// @ts-expect-error "negative" is falsely reported as an invalid option. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#signdisplay
				signDisplay: 'negative'
			})}
		</div>

		<div id='buttons' style={{ gridTemplateColumns: `repeat(${views[view].columnCount}, 58px)` }}>
			<ButtonGrid setOperandValue={setOperand} operandId={operandId} operationId={operationId} setOperandWithValue={setOperandAndOperandId} setOperationId={setOperationId} shouldClearAll={shouldClearAll} setShouldClearAll={setShouldClearAll} handleSetOperand={handleSetOperandId} operands={operands} paperTapeHistory={paperTapeHistory} setPaperTapeHistory={setPaperTapeHistory} view={view} />
		</div>
	</div>
}