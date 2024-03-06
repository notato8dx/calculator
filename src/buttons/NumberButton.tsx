import SymbolButton from './SymbolButton'
import { canOverwrite, setCanOverwrite } from '../state'

export default function NumberButton({ className, operand, operands, number, setOperandValue, setShouldClearAll, ...props }: { id?: string, className?: string, operand: number, operands: number[], number: number, setOperandValue: (operand: number, value: number) => void, setShouldClearAll: (value: boolean) => void }) {
	return <SymbolButton {...props} symbol={number.toString()} className={`number-button${className ? ` ${className}` : ''}`} onClick={() => {
		if (canOverwrite) {
			setOperandValue(operand, number)
			setCanOverwrite(false)
		} else {
			setOperandValue(operand, operands[operand] * 10 + number)
		}

		setShouldClearAll(false)
	}} />
}