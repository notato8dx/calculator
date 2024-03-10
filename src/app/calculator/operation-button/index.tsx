import SymbolButton from '../symbol-button'
import { Style } from '../utils'
import { operations } from '../../utils'

export default function OperationButton({ id, operandId, operands, operationId, setOperationId, setOperandAndOperandId }: { id: number, operandId: number, operands: number[], operationId: number, setOperationId: React.Dispatch<React.SetStateAction<number>>, setOperandAndOperandId: (value: number, id: number) => void }) {
	return <SymbolButton symbol={operations[id].symbol} style={Style.Operation} isSelected={operandId === 1 && operationId === id} onClick={() => {
		setOperationId(id)
		setOperandAndOperandId(operands[0], 1)
	}} />
}