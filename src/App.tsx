import React, { Fragment, useEffect, useRef, useState } from 'react'
import { NumberButton, OperationButton, ValueButton } from './buttons'
import Panel from './Panel'
import Label from './Label'
import { canOverwrite, setCanOverwrite } from './state'
import './App.css'

const operations = (() => {
	function createOperation(symbol: string, func: (operands: number[]) => number) {
		return { function: func, symbol }
	}

	return [
		createOperation('+', operands => operands[0] + operands[1]),
		createOperation('-', operands => operands[0] - operands[1]),
		createOperation('*', operands => operands[0] * operands[1]),
		createOperation('/', operands => operands[0] / operands[1])
	]
})()

let paperTapeKey = 0

export default function App() {
	const [operand, setOperand] = useState(0)
	const [operands, setOperands] = useState([0, 0])
	const [operation, setOperation] = useState(0)
	const [shouldClearAll, setShouldClearAll] = useState(true)
	const [isShowingSeparators, setIsShowingSeparators] = useState(false)
	const [decimalPlaces, setDecimalPlaces] = useState(15)
	const [view, setView] = useState(0)
	const [paperTapeHistory, setPaperTapeHistory] = useState([] as { operands: number[]; operation: number; value: number; key: number; }[])
	const paperTapeRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		paperTapeRef.current?.scrollIntoView()
	}, [paperTapeHistory])

	function handleSetOperand(operand: number) {
		setOperand(operand)
		setCanOverwrite(true)
	}

	function setOperandValue(operand: number, value: number) {
		setOperands([
			...operands.slice(0, operand),
			value,
			...operands.slice(operand + 1)
		])
	}

	function setOperandWithValue(operand: number, value: number) {
		handleSetOperand(operand)
		setOperandValue(operand, value)
	}

	function createBasicRow(numbers: number[], newOperation: number, operationSymbol: string) {
		return <>
			{numbers.map((number, i) => {
				return <NumberButton number={number} operand={operand} operands={operands} setOperandValue={setOperandValue} setShouldClearAll={setShouldClearAll} key={i} />
			})}

			<OperationButton currentOperation={operation} operand={operand} operands={operands} newOperation={newOperation} symbol={operationSymbol} setOperandWithValue={setOperandWithValue} setOperation={setOperation} />
		</>
	}

	function createView(columnCount: number, component: JSX.Element | JSX.Element[]) {
		return { columnCount, component }
	}

	const basicRows = [
		<>
			<button className='value-button' onClick={() => {
				if (shouldClearAll) {
					setOperandValue(1, 0)
					setOperandWithValue(0, 0)
					setOperation(0)
				} else {
					setOperandValue(operand, 0)

					if (canOverwrite) {
						handleSetOperand(0)
					}
					
					setShouldClearAll(true)
				}
			}}>
				{`${shouldClearAll ? 'A' : ''}C`}
			</button>

			<ValueButton operand={operand} value={-operands[operand]} symbol='±' setOperandValue={setOperandValue} />
			<ValueButton operand={operand} value={operands[operand] / 100} symbol='%' setOperandValue={setOperandValue} />
			<OperationButton currentOperation={operation} operand={operand} operands={operands} newOperation={3} symbol='÷' setOperandWithValue={setOperandWithValue} setOperation={setOperation} />
		</>,
		createBasicRow([7, 8, 9], 2, '×'),
		createBasicRow([4, 5, 6], 1, '−'),
		createBasicRow([1, 2, 3], 0, '+'),
		<>
			<NumberButton id='zero-button' className={view === 0 ? 'bottom-left-button' : ''} operand={operand} operands={operands} number={0} setOperandValue={setOperandValue} setShouldClearAll={setShouldClearAll} />

			<button className='number-button'>
				.
			</button>

			<button id='equal-button' className='operation-button' onClick={() => {
				const value = operations[operation].function(operands)

				setPaperTapeHistory([...paperTapeHistory, {
					operands: [...operands],
					operation,
					value,
					key: paperTapeKey
				}])

				paperTapeKey += 1

				setOperandWithValue(0, value)
			}}>
				=
			</button>
		</>
	]

	const views = [
		createView(4, basicRows)/*,
		createView(10, <>
			{<ValueButton symbol='(' />
			<ValueButton symbol=')' />
			<ValueButton symbol='mc' />
			<ValueButton symbol='m+' />
			<ValueButton symbol='m−' />
			<ValueButton symbol='mr' />
			{basicRows[0]}
			<ValueButton symbol={<>2<sup>nd</sup></>} />
			<ValueButton symbol={<>x<sup>2</sup></>} />
			<ValueButton symbol={<>x<sup>3</sup></>} />
			<ValueButton symbol={<>x<sup>y</sup></>} />
			<ValueButton symbol={<>e<sup>x</sup></>} />
			<ValueButton symbol={<>10<sup>x</sup></>} />
			{basicRows[1]}
			<ValueButton symbol={<><sup>1</sup>⁄<sub>x</sub></>} />
			<ValueButton symbol={<><sup>2</sup>√x</>} />
			<ValueButton symbol={<><sup>3</sup>√x</>} />
			<ValueButton symbol={<><sup>y</sup>√x</>} />
			<ValueButton symbol='ln' />
			<ValueButton symbol={<>log<sub>10</sub></>} />
			{basicRows[2]}
			<ValueButton symbol='x!' />
			<ValueButton symbol='sin' />
			<ValueButton symbol='cos' />
			<ValueButton symbol='tan' />
			<ValueButton symbol='e' />
			<ValueButton symbol='EE' />
			{basicRows[3]}
			<ValueButton className='bottom-left-button' symbol='Rad' />
			<ValueButton symbol='sinh' />
			<ValueButton symbol='cosh' />
			<ValueButton symbol='tanh' />
			<ValueButton symbol='π' />
			<ValueButton symbol='Rand' />
			{basicRows[4]}}
		</>),
		createView(7, null)*/
	]

	return <>
		<div id='calculator'>
			<div id='display'>
				{operands[operand].toLocaleString(undefined, {
					maximumFractionDigits: decimalPlaces,
					useGrouping: isShowingSeparators,
					signDisplay: 'negative'
				})}
			</div>

			<div id='buttons' style={{ gridTemplateColumns: `repeat(${views[view].columnCount}, 58px)` }}>
				{views[view].component}
			</div>
		</div>

		<Panel name='Settings'>
			{['Basic', 'Scientific', 'Programmer'].map((view, i) => {
				return <div key={i}>
					<input type='radio' id={view} value={i} name='view' defaultChecked={i == 0} onChange={({ target: { value } }) => {
						setView(
							parseInt(value)
						)
					}}/>

					<Label htmlFor={view} text={view} />
				</div>
			})}

			<hr />

			<div>
				<input type='checkbox' id='separators' onChange={({ target: { checked } }) => {
					setIsShowingSeparators(checked)
				}} />

				<Label htmlFor='separators' text='Show Thousands Separators' />
			</div>

			<hr />

			<div>
				<Label htmlFor='decimalPlaces' text='Decimal Places' />

				<input type='number' min={0} max={15} defaultValue={15} id='decimalPlaces' onChange={({ target: { value } }) => {
					setDecimalPlaces(
						parseInt(value)
					)
				}} />
			</div>
		</Panel>

		<Panel name='Paper Tape'>
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
		</Panel>
	</>
}
