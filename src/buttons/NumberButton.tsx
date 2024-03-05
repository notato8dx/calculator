import { canOverwrite, operands, setCanOverwrite } from '../state'

export default function NumberButton({ id, operand, number, setOperandValueAndDisplay, setShouldClearAll }) {
	return <button id={id} className='number-button' onClick={() => {
		if (canOverwrite) {
			operands[operand] = 0
			setCanOverwrite(false)
		}

		setOperandValueAndDisplay(operands[operand] * 10 + number)
		setShouldClearAll(false)
	}}>
		{number}
	</button>
}