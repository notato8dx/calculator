import React from 'react'
import SymbolButton from './SymbolButton'

export default function ValueButton({ operand, value, setOperandValue, ...props }: { operand: number, value: number, setOperandValue: (operand: number, value: number) => void, symbol: string }) {
	return <SymbolButton {...props} className='value-button' onClick={() => {
		setOperandValue(operand, value)
	}}></SymbolButton>
}