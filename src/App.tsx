import { Fragment, useEffect, useRef, useState } from 'react'
import { NumberButton, OperationButton, ValueButton } from './buttons'
import { operand, operands, operation, operations, setOperand, setOperandValue, setOperation } from './state'
import './App.css'

let paperTapeKey = 0

export default function App() {
	const [display, setDisplay] = useState(0)
	const [shouldClearAll, setShouldClearAll] = useState(true)
	const [isShowingSeparators, setIsShowingSeparators] = useState(false)
	const [isRPNMode, setIsRPNMode] = useState(false)
	const [isShowingPaperTape, setIsShowingPaperTape] = useState(false)
	const [decimalPlaces, setDecimalPlaces] = useState('15')
	const [view, setView] = useState('0')
	const [paperTapeHistory, setPaperTapeHistory] = useState([])
	const paperTapeRef = useRef(null)

	useEffect(() => {
		paperTapeRef.current?.scrollIntoView()
	}, [paperTapeHistory])

	function createNumberRow(numbers) {
		return numbers.map((number, i) => {
			return <NumberButton number={number} setDisplay={setDisplay} setShouldClearAll={setShouldClearAll} key={i} />
		})
	}

	function createBasicRow(numbers, operation, operationSymbol) {
		return <>
			{createNumberRow(numbers)}
			<OperationButton operation={operation} symbol={operationSymbol} setDisplay={setDisplay} />
		</>
	}

	function createView(columnCount, component) {
		return { columnCount, component }
	}

	const basicRows = [
		<>
			<button class='value-button' onClick={() => {
				if (shouldClearAll) {
					operands[1].value = 0
					operands[1].canOverwrite = true
					setOperation(0)
					resetDisplay(0)
				} else {
					operands[operand].value = 0

					if (operands[operand].canOverwrite) {
						operands[0].canOverwrite = true
						setOperand(0)
					}
					
					setDisplay(operands[operand].value)
					setShouldClearAll(true)
				}
			}} tooltip={`Clear${shouldClearAll ? ' All' : ''}`}>
				{`${shouldClearAll ? 'A' : ''}C`}
			</button>

			<ValueButton value={-operands[operand].value} symbol='±' tooltip='Negate the displayed value' setDisplay={setDisplay} />
			<ValueButton value={operands[operand].value / 100} symbol='%' setDisplay={setDisplay} />
			<OperationButton operation={3} symbol='÷' setDisplay={setDisplay} />
		</>,
		createBasicRow([7, 8, 9], 2, '×'),
		createBasicRow([4, 5, 6], 1, '−'),
		createBasicRow([1, 2, 3], 0, '+'),
		<>
			<NumberButton id='zero-button' number={0} setDisplay={setDisplay} setShouldClearAll={setShouldClearAll} />

			<button class='number-button'>
				.
			</button>

			<button id='equal-button' class='operation-button' onClick={() => {
				const value = operations[operation].function()

				setPaperTapeHistory([...paperTapeHistory, {
					operands: [...operands.map((operand) => { return { ...operand } })],
					operation,
					value,
					key: paperTapeKey
				}])

				paperTapeKey += 1

				resetDisplay(value)
			}}>
				=
			</button>
		</>
	]

	const views = [
		createView(4, <>
			{basicRows[0]}
			{basicRows[1]}
			{basicRows[2]}
			{basicRows[3]}
			{basicRows[4]}
		</>),
		createView(10, <>
			<button symbol='(' />
			<button symbol=')' />
			<button symbol='mc' />
			<button symbol='m+' />
			<button symbol='m−' />
			<button symbol='mr' />
			{basicRows[0]}
			<button symbol={<>2<sup>nd</sup></>} />
			<button symbol={<>x<sup>2</sup></>} />
			<button symbol={<>x<sup>3</sup></>} />
			<button symbol={<>x<sup>y</sup></>} />
			<button symbol={<>e<sup>x</sup></>} />
			<button symbol={<>10<sup>x</sup></>} />
			{basicRows[1]}
			<button symbol={<><sup>1</sup>⁄<sub>x</sub></>} />
			<button symbol={<><sup>2</sup>√x</>} />
			<button symbol={<><sup>3</sup>√x</>} />
			<button symbol={<><sup>y</sup>√x</>} />
			<button symbol='ln' />
			<button symbol={<>log<sub>10</sub></>} />
			{basicRows[2]}
			<button symbol='x!' />
			<button symbol='sin' />
			<button symbol='cos' />
			<button symbol='tan' />
			<button symbol='e' />
			<button symbol='EE' />
			{basicRows[3]}
			<button symbol='Rad' />
			<button symbol='sinh' />
			<button symbol='cosh' />
			<button symbol='tanh' />
			<button symbol='π' />
			<button symbol='Rand' />
			{basicRows[4]}
		</>),
		createView(7, null)
	]

	function resetDisplay(value) {
		setOperand(0)
		setOperandValue(value, setDisplay)
	}

	return <>
		<div id='calculator'>
			<div id='display'>
				{display.toLocaleString(undefined, {
					maximumFractionDigits: decimalPlaces,
					useGrouping: isShowingSeparators,
					signDisplay: 'negative'
				})}
			</div>

			<div id='buttons' style={{ gridTemplateColumns: `repeat(${views[view].columnCount}, 58px)` }}>
				{views[view].component}
			</div>
		</div>

		<div class='panel'>
			<h1>
				Settings
			</h1>

			{['Basic', 'Scientific', 'Programmer'].map((view, i) => {
				return <div key={i}>
					<input type='radio' id={view} value={i.toString()} name='view' defaultChecked={i == 0} onChange={({ target: { value } }) => {
						setView(value)
					}}/>

					<label htmlFor={view}>
						{view}
					</label>
				</div>
			})}

			<hr />

			{[
				{ label: 'Show Thousands Separators', setValue: setIsShowingSeparators },
				{ label: 'RPN Mode', setValue: setIsRPNMode },
				{ label: 'Paper Tape', setValue: setIsShowingPaperTape }
			].map(({ label, setValue }, i) => {
				return <Fragment key={i}>
					<input type='checkbox' value={label} id={label} name={label} onChange={({ target: { checked } }) => {
						setValue(checked)
					}} />

					<label htmlFor={label}>
						{label}
					</label>

					<hr />
				</Fragment>
			})}

			<div>
				<label for='decimalPlaces'>
					Decimal Places
				</label>

				<input type='number' min='0' max='15' defaultValue='15' id='decimalPlaces' onChange={({ target: { value } }) => {
					setDecimalPlaces(value)
				}} />
			</div>
		</div>

		{isShowingPaperTape ? <div class='panel'>
			<h1>
				Paper Tape
			</h1>

			<div style={{ overflowY: 'scroll', height: '200px' }}>
				{paperTapeHistory.map((entry) => {
					return <Fragment key={entry.key}>
						{`${entry.operands[0].value}${entry.operands[1].canOverwrite && entry.operands[1].value == 0 ? '' : ` ${operations[entry.operation].symbol} ${entry.operands[1].value}`}`}
						<br />
						{`= ${entry.value}`}
						<br />
						<br />
					</Fragment>
				})}

				<div ref={paperTapeRef} />
			</div>

			<button style={{ display: 'block', marginLeft: 'auto' }} onClick={() => {
				setPaperTapeHistory([])
			}}>
				Clear
			</button>
		</div> : null}
	</>
}
