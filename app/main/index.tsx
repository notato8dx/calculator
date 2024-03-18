import Buttons from './buttons'
import PaperTapeEntry from '../paper-tape-entry'
import View from '../view'
import Operation from '../operation'
import { useState } from 'react'
import style from './style.module.css'

interface Operand {
	value: number
}

const operands: [Operand, Operand] = [
	{ value: 0 },
	{ value: 0 }
]

let canOverwrite = true

export default ({
	displayOptions,
	view: {
		columnCount,
		Buttons: List
	},
	addPaperTapeEntry
}: {
	displayOptions: Intl.NumberFormatOptions,
	view: View,
	addPaperTapeEntry: (entry: Omit<PaperTapeEntry, 'key'>) => void
}) => {
	const [operand, setOperand] = useState(operands[0])
	const [display, setDisplay] = useState(operand.value)
	const [nextDecimal, setNextDecimal] = useState(0)

	function setOperandAndOperandId(value: number, operand: Operand) {
		operand.value = value
		setDisplay(value)
		setOperand(operand)
		canOverwrite = true
		setNextDecimal(0)
	}

	return <>
		<div id={style.display}>
			{`${display.toLocaleString(
				undefined,
				{
					...displayOptions,
					// @ts-expect-error
					signDisplay: 'negative'
				}
			)}${nextDecimal == 1 ? '.' : ''}`}
		</div>

		<div id={style.buttons} style={{ gridTemplateColumns: `repeat(${columnCount}, 58px)` }}>
			<Buttons
				List={List}
				isOperationSelected={operand == operands[1]}
				handleOperation={(setOperation: (operation: Operation) => void) => {
					return (operation: Operation) => {
						setOperation(operation)
						setOperandAndOperandId(operands[0].value, operands[1])
					}
				}}
				handleNumber={(number: number) => {
					if (nextDecimal > 0) {
						setDisplay(operand.value + number * 10 ** -nextDecimal)
						operand.value = operand.value + number * 10 ** -nextDecimal
						setNextDecimal(nextDecimal + 1)
					} else if (canOverwrite) {
						operand.value = number
						setDisplay(number)
						canOverwrite = false
					} else {
						setDisplay(operand.value * 10 + number)
						operand.value = operand.value * 10 + number
					}
				}}
				handleClear={() => {
					operand.value = 0
					setDisplay(0)
					setNextDecimal(0)
			
					if (canOverwrite) {
						setOperand(operands[0])
					}
				}}
				handleClearAll={() => {
					operands[1].value = 0
					setOperandAndOperandId(0, operands[0])
				}}
				handleValue={(getNewValue: (value: number) => number) => {
					operand.value = getNewValue(operand.value)
					setDisplay(
						getNewValue(operand.value)
					)
				}}
				handleEqual={(operation: Operation) => {
					return () => {
						const value = operation.operate([operands[0].value, operands[1].value])

						addPaperTapeEntry({
							operands: [operands[0].value, operands[1].value],
							operator: operation.symbolASCII,
							value
						})

						setOperandAndOperandId(value, operands[0])
					}
				}}
				handleDecimal={() => {
					if (nextDecimal == 0) {
						setNextDecimal(1)
					}
				}}
			/>
		</div>
	</>
}