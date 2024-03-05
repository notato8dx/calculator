export default function ValueButton({ className, value, symbol, setOperandValue }) {
	return <button className={`${className} value-button`} onClick={() => {
		setOperandValue(operand, value)
	}}>
		{symbol}
	</button>
}