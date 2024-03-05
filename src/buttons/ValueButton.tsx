export default function ValueButton({ value, symbol, setOperandValueAndDisplay }) {
	return <button className='value-button' onClick={() => {
		setOperandValueAndDisplay(value)
	}}>
		{symbol}
	</button>
}