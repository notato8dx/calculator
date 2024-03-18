import Buttons from './buttons'
import PaperTapeEntry from '../paper-tape-entry'
import './styles.css'
import View from '../view'
import Operation from '../operation'
import { useState } from 'react'

let canOverwrite = true

function useOperands(operandId: number): [number[], (value: number, id?: number) => void] {
	const [state, setState] = useState([0, 0])

	return [state, (value: number, id: number = operandId) => {
		setState([
			...state.slice(0, id),
			value,
			...state.slice(id + 1)
		])
	}]
}

function useOperandId(enableCanOverwrite: () => void): [number, (id: number) => void] {
	const [state, setState] = useState(0)

	return [state, (id: number) => {
		setState(id)
		enableCanOverwrite()
	}]
}

export default function Main({ displayOptions, view: { columnCount, Buttons: List }, addPaperTapeEntry }: { displayOptions: Intl.NumberFormatOptions, view: View, addPaperTapeEntry: (entry: Omit<PaperTapeEntry, 'key'>) => void }) {
	const [operandId, setOperandId] = useOperandId(() => {
		canOverwrite = true
	})
	const [operands, setOperand] = useOperands(operandId)

	const operand = operands[operandId]

	function setOperandAndOperandId(value: number, id: number) {
		setOperand(value, id)
		setOperandId(id)
	}

	return <>
		<div id='display'>
			{operand.toLocaleString(undefined, {
				...displayOptions,
				// @ts-expect-error
				signDisplay: 'negative'
			})}
		</div>

		<div id='buttons' style={{ gridTemplateColumns: `repeat(${columnCount}, 58px)` }}>
			<Buttons
				List={List}
				isOperationSelected={operandId === 1}
				handleOperation={(setOperation: (operation: Operation) => void) => {
					return (operation: Operation) => {
						setOperation(operation)
						setOperandAndOperandId(operands[0], 1)
					}
				}}
				handleNumber={(number: number) => {
					if (canOverwrite) {
						setOperand(number)
						canOverwrite = false
					} else {
						setOperand(operand * 10 + number)
					}
				}}
				handleClear={() => {
					setOperand(0)
			
					if (canOverwrite) {
						setOperandId(0)	
					}
				}}
				handleClearAll={() => {
					setOperand(0, 1)
					setOperandAndOperandId(0, 0)
				}}
				handleValue={(getNewValue: (value: number) => number) => {
					setOperand(getNewValue(operand))
				}}
				handleEqual={(operation: Operation) => {
					return () => {
						const value = operation.function([operands[0], operands[1]])
						addPaperTapeEntry({ operands: [operands[0], operands[1]], operationSymbol: operation.symbolASCII, value })
						setOperandAndOperandId(value, 0)
					}
				}}
			/>
		</div>
	</>
}