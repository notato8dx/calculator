export default function OperationButton({ operand, operands, currentOperation, newOperation, symbol, setOperation, handleSetOperand, setOperandValue }) {
	return <button className={`operation-button${operand === 1 && currentOperation === newOperation ? ' selected' : ''}`} onClick={() => {
		setOperation(newOperation)
		handleSetOperand(1)
		setOperandValue(1, operands[0])
	}}>
		{symbol}
	</button>
}