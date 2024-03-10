import SymbolButton from '../symbol-button'
import { Style, canOverwrite } from '../utils'

export default function ClearButton({ operandId, handleSetOperand, setOperandValue, setShouldClearAll }) {
	return <SymbolButton symbol={'C'} style={Style.Value} onClick={() => {
		setOperandValue(operandId, 0)

		if (canOverwrite) {
			handleSetOperand(0)
		}
		
		setShouldClearAll(true)
	}} />
}