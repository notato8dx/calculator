import React from 'react'
import { canOverwrite, setCanOverwrite } from '../state'

export default function NumberButton({ id, className, operand, operands, number, setOperandValue, setShouldClearAll }: { id: string, className: string, operand: number, operands: number[], number: number, setOperandValue: (operand: number, value: number) => void, setShouldClearAll: (value: boolean) => void }) {
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