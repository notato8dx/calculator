import { canOverwrite, operand, operands, setCanOverwrite, setOperandValue } from '../state'

export default function NumberButton({ id, number, setDisplay, setShouldClearAll }) {
	return <button id={id} className='number-button' onClick={() => {
		if (canOverwrite) {
			operands[operand] = 0
			setCanOverwrite(false)
		}

		setOperandValue(operands[operand] * 10 + number, setDisplay)
		setShouldClearAll(false)
	}}>
		{number}
	</button>
}