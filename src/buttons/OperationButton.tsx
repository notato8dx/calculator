import React from 'react'

export default function OperationButton({ operand, operands, currentOperation, newOperation, symbol, setOperation, setOperandWithValue }: { operand: number, operands: number[], currentOperation: number, newOperation: number, symbol: string, setOperation: (newOperation: number) => void, setOperandWithValue: (operand: number, value: number) => void }) {
	return <button className={`operation-button${operand === 1 && currentOperation === newOperation ? ' selected' : ''}`} onClick={() => {
		setOperation(newOperation)
		setOperandWithValue(1, operands[0])
	}}>
		{symbol}
	</button>
}