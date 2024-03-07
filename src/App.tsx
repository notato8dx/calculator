import { Fragment, RefObject, useEffect, useRef, useState } from 'react'
import { SymbolButton, ValueButton } from './buttons'
import Panel from './Panel'
import Label from './Label'
import { canOverwrite, setCanOverwrite } from './state'
import { Style } from './types'
import './App.css'

enum View {
	Basic,
	Scientific,
	Programmer
}

const operations: readonly { readonly symbol: string, readonly symbolASCII: string, readonly function: (operands: number[]) => number }[] = [
	{ symbol: '+', symbolASCII: '+', function: operands => operands[0] + operands[1] },
	{ symbol: '−', symbolASCII: '-', function: operands => operands[0] - operands[1] },
	{ symbol: '×', symbolASCII: '*', function: operands => operands[0] * operands[1] },
	{ symbol: '÷', symbolASCII: '/', function: operands => operands[0] / operands[1] }
]

let paperTapeKey = 0

export default function App() {
	const [operand, setOperand] = useState(0)
	const [operands, setOperands] = useState([0, 0])
	const [operation, setOperation] = useState(0)
	const [shouldClearAll, setShouldClearAll] = useState(true)
	const [isShowingSeparators, setIsShowingSeparators] = useState(false)
	const [decimalPlaces, setDecimalPlaces] = useState(15)
	const [view, setView] = useState(View.Basic)
	const [paperTapeHistory, setPaperTapeHistory] = useState<{ operands: number[]; operation: number; value: number; key: number; }[]>([])

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
		...[
			[0x1, 0x2, 0x3],
			[0x4, 0x5, 0x6],
			[0x7, 0x8, 0x9],
			[0xa, 0xb, 0xc],
			[0xd, 0xe, 0xf]
		].map(numbers => {
			return numbers.map(number => {
				return { isDouble: false, number }
			})
		})
	].map(numbers => {
		return numbers.map(({ isDouble, number }) => {
			const symbol = number.toString(16).toUpperCase().repeat(isDouble ? 2 : 1)

			return <SymbolButton isLarge={!isDouble && number === 0 && (view === View.Basic || view === View.Scientific)} isBottomLeft={!isDouble && number === 0 && view === View.Basic} symbol={symbol} style={Style.Number} onClick={() => {
				if (canOverwrite) {
					setOperandValue(operand, number)
					setCanOverwrite(false)
				} else {
					setOperandValue(operand, isDouble ? ((operands[operand] * 10 + number) * 10 + number) : (operands[operand] * 10 + number))
				}
		
				setShouldClearAll(false)
			}} />
		})
	})

	const [addButton, subtractButton, multiplyButton, divideButton] = operations.map(({ symbol }, id) => {
			return <SymbolButton symbol={symbol} style={Style.Operation} isSelected={operand === 1 && operation === id} onClick={() => {
				setOperation(id)
				setOperandWithValue(1, operands[0])
			}} />
	})

	const equalButton = <SymbolButton style={Style.Operation} isLarge={view === View.Programmer} symbol='=' onClick={() => {
		const value = operations[operation].function(operands)

		setPaperTapeHistory([...paperTapeHistory, {
			operands: [...operands],
			operation,
			value,
			key: paperTapeKey
		}])

		paperTapeKey++

		setOperandWithValue(0, value)
	}} />;

	const basicRows = [
		<>
			<SymbolButton symbol={shouldClearAll ? 'AC' : 'C'} style={Style.Value} onClick={() => {
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
			}} />

			{...Array<{ symbol: string, getNewValue: (value: number) => number }>(
				{ symbol: '⁺⁄₋', getNewValue: value => -value },
				{ symbol: '%', getNewValue: value => value / 100 }
			).map(data => {
				return <ValueButton {...data} setCurrentValue={(value) => setOperandValue(operand, value)} currentValue={operands[operand]} />
			})}

			{divideButton}
		</>,
		<>
			{...numberRow3}
			{multiplyButton}
		</>,
		<>
			{...numberRow2}
			{subtractButton}
		</>,
		<>
			{...numberRow1}
			{addButton}
		</>,
		<>
			{zeroButton}
			
			<SymbolButton symbol='.' style={Style.Number} onClick={() => {}}/>

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
			{...numberRow5}
			<ValueButton symbol='AC' />
			<ValueButton symbol='C' />
			<ValueButton symbol='NOR' />
			<ValueButton symbol='XOR' />
			{...numberRow4}
			<ValueButton symbol='RoL' />
			<ValueButton symbol='RoR' />
			<ValueButton symbol='<<' />
			<ValueButton symbol='>>' />
			{...numberRow3}
			<ValueButton symbol="2's" />
			<ValueButton symbol="1's" />
			<ValueButton symbol='X<<Y' />
			<ValueButton symbol='X>>Y' />
			{...numberRow2}
			{divideButton}
			{subtractButton}
			<ValueButton isLarge={true} symbol='byte flip' />
			{...numberRow1}
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
						{`${entry.operands[0]} ${operations[entry.operation].symbolASCII} ${entry.operands[1]}`}
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
