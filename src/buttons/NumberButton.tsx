import { operand, operands, setOperandValue } from '../state'

export default function NumberButton({ style, number, setDisplay, setShouldClearAll }) {
	return <button style={style} onClick={() => {
		if (operands[operand].canOverwrite) {
			operands[operand].value = 0
			operands[operand].canOverwrite = false
		}

		setOperandValue(operands[operand].value * 10 + number, setDisplay)
		setShouldClearAll(false)
	}}>
		{number}
	</button>
}