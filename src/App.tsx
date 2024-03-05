import { Fragment, useEffect, useRef, useState } from 'react'
import { NumberButton, OperationButton, ValueButton } from './buttons'
import { canOverwrite, operands, operations, setCanOverwrite } from './state'
import './App.css'

let paperTapeKey = 0

export default function App() {
	const [operand, setOperand] = useState(0)
	const [operation, setOperation] = useState(0)
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

	useEffect(() => {
		setCanOverwrite(true)
	}, [operand])


	function setOperandValueAndDisplay(value) {
		operands[operand] = value
		setDisplay(value)
	}

	function createNumberRow(numbers) {
		return numbers.map((number, i) => {
			return <NumberButton number={number} operand={operand} setOperandValueAndDisplay={setOperandValueAndDisplay} setShouldClearAll={setShouldClearAll} key={i} />
		})
	}

	function createBasicRow(numbers, newOperation, operationSymbol) {
		return <>
			{createNumberRow(numbers)}
			<OperationButton currentOperation={operation} operand={operand} newOperation={newOperation} symbol={operationSymbol} setOperandValueAndDisplay={setOperandValueAndDisplay} setOperand={setOperand} setOperation={setOperation} />
		</>
	}

	function createView(columnCount, component) {
		return { columnCount, component }
	}

	const basicRows = [
		<>
			<button className='value-button' onClick={() => {
				if (shouldClearAll) {
					operands[1] = 0
					setCanOverwrite(true)
					setOperation(0)
					resetDisplay(0)
				} else {
					operands[operand] = 0

					if (canOverwrite) {
						setOperand(0)
					}
					
					setOperandValueAndDisplay(operands[operand])
					setShouldClearAll(true)
				}
			}} tooltip={`Clear${shouldClearAll ? ' All' : ''}`}>
				{`${shouldClearAll ? 'A' : ''}C`}
			</button>

			<ValueButton value={-operands[operand]} symbol='±' tooltip='Negate the displayed value' setOperandValueAndDisplay={setOperandValueAndDisplay} />
			<ValueButton value={operands[operand] / 100} symbol='%' setOperandValueAndDisplay={setOperandValueAndDisplay} />
			<OperationButton currentOperation={operation} operand={operand} newOperation={3} symbol='÷' setOperandValueAndDisplay={setOperandValueAndDisplay} setOperand={setOperand} setOperation={setOperation} />
		</>,
		createBasicRow([7, 8, 9], 2, '×'),
		createBasicRow([4, 5, 6], 1, '−'),
		createBasicRow([1, 2, 3], 0, '+'),
		<>
			<NumberButton id='zero-button' operand={operand} number={0} setOperandValueAndDisplay={setOperandValueAndDisplay} setShouldClearAll={setShouldClearAll} />

			<button className='number-button'>
				.
			</button>

			<button id='equal-button' className='operation-button' onClick={() => {
				const value = operations[operation].function()

				setPaperTapeHistory([...paperTapeHistory, {
					operands: [...operands],
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
		setOperandValueAndDisplay(value)
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

		<div className='panel'>
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
				<label htmlFor='decimalPlaces'>
					Decimal Places
				</label>

				<input type='number' min='0' max='15' defaultValue='15' id='decimalPlaces' onChange={({ target: { value } }) => {
					setDecimalPlaces(value)
				}} />
			</div>
		</div>

		{isShowingPaperTape ? <div className='panel'>
			<h1>
				Paper Tape
			</h1>

			<div style={{ overflowY: 'scroll', height: '200px' }}>
				{paperTapeHistory.map((entry) => {
					return <Fragment key={entry.key}>
						{`${entry.operands[0]} ${operations[entry.operation].symbol} ${entry.operands[1]}`}
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
