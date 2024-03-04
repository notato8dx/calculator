import { setOperandValue } from '../state'

export default function ValueButton({ value, symbol, setDisplay }) {
	return <button class='value-button' onClick={() => {
		setOperandValue(value, setDisplay)
	}}>
		{symbol}
	</button>
}