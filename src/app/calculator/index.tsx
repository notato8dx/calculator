import { useState } from 'react'
import { setCanOverwrite } from './utils.ts'
import { PaperTapeEntry, views } from '../utils'

export default function Calculator({ decimalPlaces, isShowingSeparators, view, paperTapeHistory, setPaperTapeHistory }: { decimalPlaces: number, isShowingSeparators: boolean, view: number, paperTapeHistory: PaperTapeEntry[], setPaperTapeHistory: React.Dispatch<React.SetStateAction<PaperTapeEntry[]>> }) {
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
			<ButtonGrid setOperand={setOperand} operandId={operandId} operationId={operationId} setOperandAndOperandId={setOperandAndOperandId} setOperationId={setOperationId} shouldClearAll={shouldClearAll} setShouldClearAll={setShouldClearAll} handleSetOperand={handleSetOperandId} operands={operands} paperTapeHistory={paperTapeHistory} setPaperTapeHistory={setPaperTapeHistory} />
		</div>
	</div>
}