import SymbolButton from './SymbolButton'
import { Operation } from '../types'

export default function OperationButton({ operand, operands, currentOperation, newOperation, setOperation, setOperandWithValue, ...props }: { operand: number, operands: number[], currentOperation: Operation, newOperation: Operation, symbol: string, setOperation: (newOperation: Operation) => void, setOperandWithValue: (operand: number, value: number) => void }) {
	return <SymbolButton {...props} className={`operation-button${operand === 1 && currentOperation === newOperation ? ' selected' : ''}`} onClick={() => {
		setOperation(newOperation)
		setOperandWithValue(1, operands[0])
	}} />
}