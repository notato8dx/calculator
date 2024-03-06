import React from 'react'

export default function ValueButton({ className, operand, value, symbol, setOperandValue }: { className: string, operand: number, value: number, symbol: string, setOperandValue: (operand: number, value: number) => void }) {
	return <button className={`value-button${className ? ` ${className}` : ''}`} onClick={() => {
		setOperandValue(operand, value)
	}}>
		{symbol}
	</button>
}