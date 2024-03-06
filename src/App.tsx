import { Fragment, RefObject, useEffect, useRef, useState } from 'react'
import { SymbolButton, NumberButton, OperationButton, ValueButton } from './buttons'
import Panel from './Panel'
import Label from './Label'
import { canOverwrite, setCanOverwrite } from './state'
import { Operation, Style } from './types'
import './App.css'

enum View {
	Basic,
	Scientific,
	Programmer
}

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
	const [operation, setOperation] = useState(Operation.Add)
	const [shouldClearAll, setShouldClearAll] = useState(true)
	const [isShowingSeparators, setIsShowingSeparators] = useState(false)
	const [decimalPlaces, setDecimalPlaces] = useState(15)
	const [view, setView] = useState(View.Basic)
	const [paperTapeHistory, setPaperTapeHistory] = useState(Array<{ operands: number[]; operation: number; value: number; key: number; }>())
	const paperTapeRef = useRef<Element>(null)

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

	const [[doubleFButton, zeroButton, doubleZeroButton], numberRow1, numberRow2, numberRow3, numberRow4, numberRow5] = [
		[ { isDouble: true, number: 0xf }, { isDouble: false, number: 0x0 }, { isDouble: true, number: 0x0 } ],
		[ { isDouble: false, number: 0x1 }, { isDouble: false, number: 0x2 }, { isDouble: false, number: 0x3 } ],
		[ { isDouble: false, number: 0x4 }, { isDouble: false, number: 0x5 }, { isDouble: false, number: 0x6 } ],
		[ { isDouble: false, number: 0x7 }, { isDouble: false, number: 0x8 }, { isDouble: false, number: 0x9 } ],
		[ { isDouble: false, number: 0xa }, { isDouble: false, number: 0xb }, { isDouble: false, number: 0xc } ],
		[ { isDouble: false, number: 0xd }, { isDouble: false, number: 0xe }, { isDouble: false, number: 0xf } ],
	].map(numbers => {
		return numbers.map(data => {
			return <NumberButton {...data} isLarge={!data.isDouble && data.number === 0 && (view === View.Basic || view === View.Scientific)} isBottomLeft={!data.isDouble && data.number === 0 && view === View.Basic} operand={operand} operands={operands} setOperandValue={setOperandValue} setShouldClearAll={setShouldClearAll} />
		})
	})

	const [addButton, subtractButton, multiplyButton, divideButton] = [
		{ id: 0, symbol: '+' },
		{ id: 1, symbol: '−' },
		{ id: 2, symbol: '×' },
		{ id: 3, symbol: '÷' },
	].map(({ id, symbol }) => {
			return <OperationButton currentOperation={operation} operand={operand} operands={operands} newOperation={id} symbol={symbol} setOperandWithValue={setOperandWithValue} setOperation={setOperation} />
	})

	const equalButton = <SymbolButton style={Style.Operation} isBottomLeft={false} isLarge={view === View.Programmer} isSelected={false} symbol='=' onClick={() => {
		const value = operations[operation].function(operands)

		setPaperTapeHistory([...paperTapeHistory, {
			operands: [...operands],
			operation,
			value,
			key: paperTapeKey
		}])

		paperTapeKey += 1

		setOperandWithValue(0, value)
	}} />;

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
				{shouldClearAll ? 'AC' : 'C'}
			</button>

			{Array<{ symbol: string, getNewValue: (value: number) => number }>(
				{ symbol: '⁺⁄₋', getNewValue: value => -value },
				{ symbol: '%', getNewValue: value => value / 100 }
			).map(data => {
				return <ValueButton {...data} isLarge={false} isBottomLeft={false} setCurrentValue={(value) => setOperandValue(operand, value)} currentValue={operands[operand]} />
			})}

			{divideButton}
		</>,
		<>
			{numberRow3}
			{multiplyButton}
		</>,
		<>
			{numberRow2}
			{subtractButton}
		</>,
		<>
			{numberRow1}
			{addButton}
		</>,
		<>
			{zeroButton}
			
			<button className='number-button'>
				.
			</button>

			{equalButton}
		</>
	]

	const views = [
		{ columnCount: 4, component: basicRows },
		{ columnCount: 10, component: <>
			<ValueButton symbol='(' />
			<ValueButton symbol=')' />
			<ValueButton symbol='mc' />
			<ValueButton symbol='m+' />
			<ValueButton symbol='m−' />
			<ValueButton symbol='mr' />
			{basicRows[0]}
			<ValueButton symbol='2nd' />
			<ValueButton symbol='x²' />
			<ValueButton symbol='x³' />
			<ValueButton symbol='xⁿ' />
			<ValueButton symbol='eⁿ' />
			<ValueButton symbol='10ⁿ' />
			{basicRows[1]}
			<ValueButton symbol='¹⁄ₓ' />
			<ValueButton symbol='²√x' />
			<ValueButton symbol='³√x' />
			<ValueButton symbol='ⁿ√x' />
			<ValueButton symbol='ln' />
			<ValueButton symbol='log₁₀' />
			{basicRows[2]}
			<ValueButton symbol='x!' />
			<ValueButton symbol='sin' />
			<ValueButton symbol='cos' />
			<ValueButton symbol='tan' />
			<ValueButton symbol='e' />
			<ValueButton symbol='EE' />
			{basicRows[3]}
			<ValueButton isBottomLeft={true} symbol='Rad' />
			<ValueButton symbol='sinh' />
			<ValueButton symbol='cosh' />
			<ValueButton symbol='tanh' />
			<ValueButton symbol='π' />
			<ValueButton symbol='Rand' />
			{basicRows[4]}
		</> },
		{ columnCount: 7, component: <>
			<ValueButton symbol='AND' />
			<ValueButton symbol='OR' />
			{numberRow5}
			<ValueButton symbol='AC' />
			<ValueButton symbol='C' />
			<ValueButton symbol='NOR' />
			<ValueButton symbol='XOR' />
			{numberRow4}
			<ValueButton symbol='RoL' />
			<ValueButton symbol='RoR' />
			<ValueButton symbol='<<' />
			<ValueButton symbol='>>' />
			{numberRow3}
			<ValueButton symbol="2's" />
			<ValueButton symbol="1's" />
			<ValueButton symbol='X<<Y' />
			<ValueButton symbol='X>>Y' />
			{numberRow2}
			{divideButton}
			{subtractButton}
			<ValueButton isLarge={true} symbol='byte flip' />
			{numberRow1}
			{multiplyButton}
			{addButton}
			<ValueButton isBottomLeft={true} isLarge={true} symbol='word flip' />
			{doubleFButton}
			{zeroButton}
			{doubleZeroButton}
			{equalButton}
		</> }
	]

	return <>
		<div id='calculator'>
			<div id='display'>
				{operands[operand].toLocaleString(undefined, {
					maximumFractionDigits: decimalPlaces,
					useGrouping: isShowingSeparators,
					// @ts-expect-error "negative" is falsely reported as an invalid option. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#signdisplay
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
							parseInt(value) as View
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

				<div ref={paperTapeRef as RefObject<HTMLDivElement>} />
			</div>

			<button style={{ display: 'block', marginLeft: 'auto' }} onClick={() => {
				setPaperTapeHistory([])
			}}>
				Clear
			</button>
		</Panel>
	</>
}
