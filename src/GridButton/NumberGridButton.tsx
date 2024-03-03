import GridButton from './'
import { operand, operands, setOperandValue } from '../state'

export default function NumberGridButton({ style, number, setDisplay, setShouldClearAll }) {
	return <GridButton style={style} symbol={number} onClick={() => {
		if (operands[operand].canOverwrite) {
			operands[operand].value = 0
			operands[operand].canOverwrite = false
		}

		setOperandValue(operands[operand].value * 10 + number, setDisplay)
		setShouldClearAll(false)
	}} />
}