import SymbolButton from './SymbolButton'
import { Operation, Style } from '../types'

export default function OperationButton({ operand, operands, currentOperation, newOperation, setOperation, setOperandWithValue, ...props }: { operand: number, operands: number[], currentOperation: Operation, newOperation: Operation, symbol: string, setOperation: (newOperation: Operation) => void, setOperandWithValue: (operand: number, value: number) => void }) {
	return <SymbolButton {...props} isBottomLeft={false} isLarge={false} style={Style.Operation} isSelected={operand === 1 && currentOperation === newOperation} onClick={() => {
		setOperation(newOperation)
		setOperandWithValue(1, operands[0])
	}} />
}