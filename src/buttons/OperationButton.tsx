import { operands } from '../state'

export default function OperationButton({ operand, currentOperation, newOperation, symbol, setOperation, setOperand, setOperandValueAndDisplay }) {
	return <button className={`operation-button${operand === 1 && currentOperation === newOperation ? ' selected' : ''}`} onClick={() => {
		setOperation(newOperation)
		setOperand(1)
		setOperandValueAndDisplay(operands[0])
	}}>
		{symbol}
	</button>
}