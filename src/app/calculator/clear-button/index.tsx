import SymbolButton from '../symbol-button'
import { Style, canOverwrite } from '../utils'

export default function ClearButton({ handleSetOperand, setOperand, setShouldClearAll }: { handleSetOperand: (operandId: number) => void, setOperand: (value: number, id?: number) => void, setShouldClearAll: React.Dispatch<React.SetStateAction<boolean>> }) {
	return <SymbolButton symbol={'C'} style={Style.Value} onClick={() => {
		setOperand(0)

		if (canOverwrite) {
			handleSetOperand(0)
		}
		
		setShouldClearAll(true)
	}} />
}