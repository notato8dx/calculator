import { setOperandValue } from '../state'

export default function ValueButton({ value, symbol, setDisplay }) {
	return <button className='value-button' onClick={() => {
		setOperandValue(value, setDisplay)
	}}>
		{symbol}
	</button>
}