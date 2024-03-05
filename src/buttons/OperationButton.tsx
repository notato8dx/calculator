export default function OperationButton({ operand, operands, currentOperation, newOperation, symbol, setOperation, setOperandWithValue }) {
	return <button className={`operation-button${operand === 1 && currentOperation === newOperation ? ' selected' : ''}`} onClick={() => {
		setOperation(newOperation)
		setOperandWithValue(1, operands[0])
	}}>
		{symbol}
	</button>
}