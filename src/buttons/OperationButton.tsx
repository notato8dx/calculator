import { operand, operands, setOperand, setOperandValue } from '../state'

export default function OperationButton({ currentOperation, operation: newOperation, symbol, setDisplay, setOperation }) {
	return <button className={`operation-button${operand == 1 && currentOperation == newOperation ? ' selected' : ''}`} onClick={() => {
		setOperation(newOperation)
		setOperand(1)
		setOperandValue(operands[0], setDisplay)
	}}>
		{symbol}
	</button>
}