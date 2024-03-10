import SymbolButton from '../symbol-button'
import { Style, canOverwrite, setCanOverwrite } from '../utils'
import { View } from '../../utils'

export default function NumberButton({ number, isDouble, operandId, operands, view, setShouldClearAll, setOperandValue }: { number: number, isDouble?: boolean, operandId: number, operands: number[], view: number, setShouldClearAll: React.Dispatch<React.SetStateAction<boolean>>, setOperandValue: (operandId: number, value: number) => void }) {
	return <SymbolButton isLarge={!isDouble && number === 0 && (view === View.Basic || view === View.Scientific)} isBottomLeft={!isDouble && number === 0 && view === View.Basic} symbol={number.toString(16).toUpperCase().repeat(isDouble ? 2 : 1)} style={Style.Number} onClick={() => {
		if (canOverwrite) {
			setOperandValue(operandId, number)
			setCanOverwrite(false)
		} else {
			setOperandValue(operandId, isDouble ? ((operands[operandId] * 10 + number) * 10 + number) : (operands[operandId] * 10 + number))
		}

		setShouldClearAll(false)
	}} />
}