import SymbolButton from '../symbol-button'
import { Style, canOverwrite, setCanOverwrite } from '../utils'

export default function NumberButton({ number, isDouble, operandId, operands, isLarge, isBottomLeft, setShouldClearAll, setOperand }: { number: number, isDouble?: boolean, isBottomLeft?: boolean, operandId: number, operands: number[], isLarge?: boolean, setShouldClearAll: React.Dispatch<React.SetStateAction<boolean>>, setOperand: (value: number, operandId?: number) => void }) {
	return <SymbolButton isLarge={isLarge} isBottomLeft={isBottomLeft} symbol={number.toString(16).toUpperCase().repeat(isDouble ? 2 : 1)} style={Style.Number} onClick={() => {
		if (canOverwrite) {
			setOperand(number)
			setCanOverwrite(false)
		} else {
			setOperand(isDouble ? ((operands[operandId] * 10 + number) * 10 + number) : (operands[operandId] * 10 + number))
		}

		setShouldClearAll(false)
	}} />
}