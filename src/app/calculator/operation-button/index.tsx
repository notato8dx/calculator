import SymbolButton from '../symbol-button'
import { Style } from '../utils'
import { operations } from '../../utils'

export default function OperationButton({ id, operandId, operands, operationId, setOperationId, setOperandWithValue }) {
	return <SymbolButton symbol={operations[id].symbol} style={Style.Operation} isSelected={operandId === 1 && operationId === id} onClick={() => {
		setOperationId(id)
		setOperandWithValue(1, operands[0])
	}} />
}