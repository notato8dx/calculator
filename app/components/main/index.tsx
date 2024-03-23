import { useRef, useState } from 'react'
import { views } from '../../data'
import { Operation, PaperTapeEntry } from '../../types'
import styles from './styles.module.css'

interface Operand {
	value: number
}

const operands: [Operand, Operand] = [
	{ value: 0 },
	{ value: 0 }
]

export default ({
	displayOptions,
	view: {
		columnCount,
		ButtonList
	},
	addPaperTapeEntry
}: {
	displayOptions: Intl.NumberFormatOptions,
	view: typeof views[number],
	addPaperTapeEntry: (entry: Omit<PaperTapeEntry, 'key'>) => void
}) => {
	const [operand, setOperand] = useState(operands[0])
	const [display, setDisplay] = useState(operand.value)
	const [nextDecimal, setNextDecimal] = useState(0)
	const canOverwrite = useRef(true)

	function setOperandAndOperandId(value: number, operand: Operand) {
		operand.value = value
		setDisplay(value)
		setOperand(operand)
		canOverwrite.current = true
		setNextDecimal(0)
	}

	return <>
		<div className={styles.display}>
			{`${display.toLocaleString(
				undefined,
				displayOptions
			)}${nextDecimal == 1 ? '.' : ''}`}
		</div>

		<div
			className={styles.buttons}
			style={{
				gridTemplateColumns: `repeat(${columnCount}, 58px)`
			}}
		>
			<ButtonList
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
					} else if (canOverwrite.current) {
						operand.value = number
						setDisplay(number)
						canOverwrite.current = false
					} else {
						setDisplay(operand.value * 10 + number)
						operand.value = operand.value * 10 + number
					}
				}}
				handleClear={() => {
					operand.value = 0
					setDisplay(0)
					setNextDecimal(0)
			
					if (canOverwrite.current) {
						setOperand(operands[0])
					}
				}}
				handleClearAll={() => {
					operands[1].value = 0
					setOperandAndOperandId(0, operands[0])
				}}
				handleValue={(getNewValue: (value: number) => number) => {
					operand.value = getNewValue(operand.value)
					setDisplay(operand.value)
				}}
				handleEqual={(operation: Operation) => {
					const value = operation.operate([operands[0].value, operands[1].value])

					addPaperTapeEntry({
						operands: [operands[0].value, operands[1].value],
						operator: operation.symbolASCII,
						value
					})

					setOperandAndOperandId(value, operands[0])
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