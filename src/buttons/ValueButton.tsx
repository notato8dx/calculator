export default function ValueButton({ className, operand, value, symbol, setOperandValue }) {
	return <button className={`value-button${className ? ` ${className}` : ''}`} onClick={() => {
		setOperandValue(operand, value)
	}}>
		{symbol}
	</button>
}