import SymbolButton from './SymbolButton'
import { canOverwrite, setCanOverwrite } from '../state'
import { Style } from '../types'

export default function NumberButton({ isDouble, operand, operands, number, setOperandValue, setShouldClearAll, ...props }: { id?: string, operand: number, isDouble: boolean, isBottomLeft: boolean, isLarge: boolean, operands: number[], number: number, setOperandValue: (operand: number, value: number) => void, setShouldClearAll: (value: boolean) => void }) {
	return <SymbolButton {...props} symbol={number.toString(16).toUpperCase().repeat(isDouble ? 2 : 1)} style={Style.Number} isSelected={false} onClick={() => {
		if (canOverwrite) {
			setOperandValue(operand, number)
			setCanOverwrite(false)
		} else {
			setOperandValue(operand, isDouble ? ((operands[operand] * 10 + number) * 10 + number) : (operands[operand] * 10 + number))
		}

		setShouldClearAll(false)
	}} />
}