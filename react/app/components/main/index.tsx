import { useRef, useState } from 'react'
import { ButtonList } from '..'
import { Operation, PaperTapeEntry } from '../../types'
import styles from './styles.module.css'

export default ({
	displayOptions,
	addPaperTapeEntry
}: {
	displayOptions: Intl.NumberFormatOptions,
	addPaperTapeEntry: (entry: Omit<PaperTapeEntry, 'key'>) => void
}) => {
	const [display, setDisplay] = useState(0)
	const [operationComplete, setOperationComplete] = useState(true)
	const [nextDigitPosition, setNextDigitPosition] = useState<'start' | 'end' | number>('start')
	const operand = useRef(0)

	return <>
		<div className={styles.display}>
			{`${display.toLocaleString(undefined, displayOptions)}${nextDigitPosition == 1 ? '.' : ''}`}
		</div>

		<div
			className={styles.buttons}
			style={{
				gridTemplateColumns: `repeat(4, 58px)`
			}}
		>
			<ButtonList
				operationComplete={operationComplete}
				handleOperation={() => {
					setOperationComplete(false)
					setNextDigitPosition('start')
					operand.current = display
				}}
				handleNumber={(number: number) => {
					if (typeof nextDigitPosition == 'number') {
						setDisplay(display + number * 10 ** -nextDigitPosition)
						setNextDigitPosition(nextDigitPosition + 1)
					} else if (nextDigitPosition == 'start') {
						setDisplay(number)
						setNextDigitPosition('end')
					} else {
						setDisplay(display * 10 + number)
					}
				}}
				handleClear={() => {
					setDisplay(0)

					if (!operationComplete && nextDigitPosition == 'start') {
						setDisplay(operand.current)
						setOperationComplete(true)
						operand.current = 0
					}

					setNextDigitPosition('start')
				}}
				handleClearAll={() => {
					setDisplay(0)
					setOperationComplete(true)
					operand.current = 0
				}}
				handleValue={(getNewValue: (value: number) => number) => {
					setDisplay(getNewValue(display))
				}}
				handleEqual={(operation: Operation) => {
					const operands: [number, number] = operationComplete ? [display, operand.current] : [operand.current, display]
					const value = operation.operate(operands)

					addPaperTapeEntry({
						operands: operands,
						operator: operation.symbolASCII,
						value
					})

					if (!operationComplete) {
						operand.current = display
						setOperationComplete(true)
						setNextDigitPosition('start')
					}

					setDisplay(value)
				}}
				handleDecimal={() => {
					if (typeof nextDigitPosition != 'number') {
						setNextDigitPosition(1)

						if (nextDigitPosition == 'start') {
							setDisplay(0)
						}
					}
				}}
			/>
		</div>
	</>
}