import { operand, operands, setOperandValue } from '../state'

export default function NumberButton({ id, number, setDisplay, setShouldClearAll }) {
	return <button id={id} class='number-button' onClick={() => {
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