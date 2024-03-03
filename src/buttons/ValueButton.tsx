import { setOperandValue } from '../state'

export default function ValueButton({ value, symbol, tooltip, setDisplay }) {
	return <button tooltip={tooltip} onClick={() => {
		setOperandValue(value, setDisplay)
	}}>
		{symbol}
	</button>
}