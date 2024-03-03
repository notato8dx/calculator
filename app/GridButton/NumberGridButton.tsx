import GridButton from './'
import { operand, operands, setOperandValue } from '../state'

export default function NumberGridButton({ colSpan, number, setDisplay, setShouldClearAll }) {
	return <GridButton symbol={number} colSpan={colSpan} onClick={() => {
		if (operands[operand].canOverwrite) {
			operands[operand].value = 0
			operands[operand].canOverwrite = false
		}

		setOperandValue(operands[operand].value * 10 + number, setDisplay)
		setShouldClearAll(false)
	}} />
}