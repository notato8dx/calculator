import SymbolButton from '../symbol-button'
import { Style } from '../utils'
import { View, operations } from '../../utils'

let paperTapeKey = 0

export default function EqualButton({ operands, operationId, paperTapeHistory, view, setOperandWithValue, setPaperTapeHistory }) {
	return <SymbolButton style={Style.Operation} isLarge={view === View.Programmer} symbol='=' onClick={() => {
		const value = operations[operationId].function(operands)

		setPaperTapeHistory([...paperTapeHistory, {
			operands: [...operands],
			operationId,
			value,
			key: paperTapeKey
		}])

		paperTapeKey++

		setOperandWithValue(0, value)
	}} />
}