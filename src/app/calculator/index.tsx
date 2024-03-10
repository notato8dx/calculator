import { useState } from 'react'
import { setCanOverwrite } from './utils.ts'
import { views } from '../utils'

export default function Calculator({ decimalPlaces, isShowingSeparators, view, paperTapeHistory, setPaperTapeHistory }: { decimalPlaces: number, isShowingSeparators: boolean, view: number }) {
	const [operandId, setOperandId] = useState(0)
	const [operands, setOperands] = useState([0, 0])
	const [operationId, setOperationId] = useState(0)
	const [shouldClearAll, setShouldClearAll] = useState(true)

	function handleSetOperand(operandId: number) {
		setOperandId(operandId)
		setCanOverwrite(true)
	}

	function setOperandValue(operandId: number, value: number) {
		setOperands([
			...operands.slice(0, operandId),
			value,
			...operands.slice(operandId + 1)
		])
	}

	function setOperandWithValue(operandId: number, value: number) {
		handleSetOperand(operandId)
		setOperandValue(operandId, value)
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
			<ButtonGrid setOperandValue={setOperandValue} operandId={operandId} operationId={operationId} setOperandWithValue={setOperandWithValue} setOperationId={setOperationId} shouldClearAll={shouldClearAll} setShouldClearAll={setShouldClearAll} handleSetOperand={handleSetOperand} operands={operands} paperTapeHistory={paperTapeHistory} setPaperTapeHistory={setPaperTapeHistory} view={view} />
		</div>
	</div>
}