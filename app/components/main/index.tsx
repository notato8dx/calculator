import { useRef, useState } from 'react'
import { views } from '../../data'
import { Operation, PaperTapeEntry } from '../../types'
import styles from './styles.module.css'


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
	const [display, setDisplay] = useState(0)
	const [separatorVisible, setSeparatorVisible] = useState(false)
	const [operationComplete, setOperationComplete] = useState(true)
	const displayAvailable = useRef(true)
	const fractionDigitCount = useRef(0)
	const operand = useRef(0)

	return <>
		<div className={styles.display}>
			{`${display.toLocaleString(
				undefined,
				displayOptions
			)}${separatorVisible ? '.' : ''}`}
		</div>

		<div
			className={styles.buttons}
			style={{
				gridTemplateColumns: `repeat(${columnCount}, 58px)`
			}}
		>
			<ButtonList
				operationComplete={operationComplete}
				handleOperation={() => {
					setOperationComplete(false)
					displayAvailable.current = true
					operand.current = display
				}}
				handleNumber={(number: number) => {
					if (fractionDigitCount.current > 0) {
						setDisplay(display + number * 10 ** -fractionDigitCount.current)
						fractionDigitCount.current++
					} else if (displayAvailable.current) {
						setDisplay(number)
						displayAvailable.current = false
					} else {
						setDisplay(display * 10 + number)
					}
				}}
				handleClear={() => {
					setDisplay(0)
					setSeparatorVisible(false)
					fractionDigitCount.current = 0
			
					if (displayAvailable.current) {
						setDisplay(operand.current)
					}
				}}
				handleClearAll={() => {
					setDisplay(0)
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
						displayAvailable.current = true
					}

					setDisplay(value)
				}}
				handleDecimal={() => {
					if (!separatorVisible) {
						setSeparatorVisible(true)
					}
				}}
			/>
		</div>
	</>
}