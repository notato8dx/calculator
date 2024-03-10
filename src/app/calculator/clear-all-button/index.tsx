import SymbolButton from '../symbol-button'
import { Style } from '../utils'

export default function ClearAllButton({ setOperandValue, setOperandWithValue }) {
	return <SymbolButton symbol={'AC'} style={Style.Value} onClick={() => {
		setOperandValue(1, 0)
		setOperandWithValue(0, 0)
	}} />
}