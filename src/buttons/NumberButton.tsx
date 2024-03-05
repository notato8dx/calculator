import { canOverwrite, setCanOverwrite } from '../state'

export default function NumberButton({ id, className, operand, operands, number, setOperandValue, setShouldClearAll }) {
	return <button id={id} className={`number-button${className ? ` ${className}` : ''}`} onClick={() => {
		if (canOverwrite) {
			setOperandValue(operand, number)
			setCanOverwrite(false)
		} else {
			setOperandValue(operand, operands[operand] * 10 + number)
		}

		setShouldClearAll(false)
	}}>
		{number}
	</button>
}