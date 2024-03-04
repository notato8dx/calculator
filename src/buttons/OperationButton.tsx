import { operands, setOperand, setOperandValue, setOperation } from '../state'

export default function OperationButton({ currentOperation, operation: newOperation, symbol, setDisplay }) {
	return <button class={`operation-button${currentOperation == newOperation ? ' selected' : ''}`} onClick={() => {
		setOperation(newOperation)
		setOperand(1)
		setOperandValue(operands[0].value, setDisplay)
	}}>
		{symbol}
	</button>
}