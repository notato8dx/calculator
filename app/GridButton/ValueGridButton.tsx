import GridButton from './'
import { setOperandValue } from '../state'

export default function ValueGridButton({ value, symbol, tooltip, setDisplay }) {
	return <GridButton symbol={symbol} tooltip={tooltip} onClick={() => setOperandValue(value, setDisplay)} />
}