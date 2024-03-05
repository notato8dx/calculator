export default function ValueButton({ className, value, symbol, setOperandValueAndDisplay }) {
	return <button className={`${className} value-button`} onClick={() => {
		setOperandValueAndDisplay(value)
	}}>
		{symbol}
	</button>
}