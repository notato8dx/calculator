import { useState } from 'react'
import { SymbolButton, ValueButton } from './buttons'
import PaperTapePanel from './paper-tape-panel'
import SettingsPanel from './settings-panel'
import { Operation, PaperTapeEntry, Style, View, canOverwrite, setCanOverwrite } from './utils'
import './styles.css'

const addition = new Operation('+', '+', operands => operands[0] + operands[1])
const subtraction = new Operation('−', '-', operands => operands[0] - operands[1])
const multiplication = new Operation('×', '*', operands => operands[0] * operands[1])
const division = new Operation('÷', '/', operands => operands[0] / operands[1])

let paperTapeKey = 0

export default function App() {
	const [operandId, setOperandId] = useState(0)
	const [operands, setOperands] = useState([0, 0])
	const [operation, setOperation] = useState(addition)
	const [shouldClearAll, setShouldClearAll] = useState(true)
	const [isShowingSeparators, setIsShowingSeparators] = useState(false)
	const [decimalPlaces, setDecimalPlaces] = useState(15)
	const [view, setView] = useState(View.Basic)
	const [paperTapeHistory, setPaperTapeHistory] = useState<PaperTapeEntry[]>([])

	function handleSetOperand(operandId: number) {
		setOperandId(operandId)
		setCanOverwrite(true)
	}

	function setOperandValue(operandId: number, value: number) {
		setOperands([
			...operands.slice(0, operandId),
			value,
			...operands.slice(operandId + 1)
		])
	}

	function setOperandWithValue(operandId: number, value: number) {
		handleSetOperand(operandId)
		setOperandValue(operandId, value)
	}

	const [[doubleFButton, zeroButton, doubleZeroButton], numberRow1, numberRow2, numberRow3, numberRow4, numberRow5] = Array<[number, boolean][]>(
		[[0xf, true], [0x0, false], [0x0, true]],
		...[
			[0x1, 0x2, 0x3],
			[0x4, 0x5, 0x6],
			[0x7, 0x8, 0x9],
			[0xa, 0xb, 0xc],
			[0xd, 0xe, 0xf]
		].map(numbers => {
			return numbers.map<[number, boolean]>((number) => {
				return [number, false]
			})
		})
	).map(numbers => {
		return numbers.map(([number, isDouble]) => {
			const symbol = number.toString(16).toUpperCase().repeat(isDouble ? 2 : 1)

			return <SymbolButton isLarge={!isDouble && number === 0 && (view === View.Basic || view === View.Scientific)} isBottomLeft={!isDouble && number === 0 && view === View.Basic} symbol={symbol} style={Style.Number} onClick={() => {
				if (canOverwrite) {
					setOperandValue(operandId, number)
					setCanOverwrite(false)
				} else {
					setOperandValue(operandId, isDouble ? ((operands[operandId] * 10 + number) * 10 + number) : (operands[operandId] * 10 + number))
				}
		
				setShouldClearAll(false)
			}} />
		})
	})

	const [addButton, subtractButton, multiplyButton, divideButton] = [addition, subtraction, multiplication, division].map(thisOperation => {
			return <SymbolButton symbol={thisOperation.symbol} style={Style.Operation} isSelected={operandId === 1 && operation === thisOperation} onClick={() => {
				setOperation(thisOperation)
				setOperandWithValue(1, operands[0])
			}} />
	})

	const equalButton = <SymbolButton style={Style.Operation} isLarge={view === View.Programmer} symbol='=' onClick={() => {
		const value = operation.function(operands)

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
					setOperation(addition)
				} else {
					setOperandValue(operandId, 0)

					if (canOverwrite) {
						handleSetOperand(0)
					}
					
					setShouldClearAll(true)
				}
			}} />

			{...Array<[string, (value: number) => number]>(
				['⁺⁄₋', value => -value],
				['%', value => value / 100],
			).map(([symbol, getNewValue]) => {
				return <ValueButton symbol={symbol} getNewValue={getNewValue} setCurrentValue={(value) => setOperandValue(operandId, value)} currentValue={operands[operandId]} />
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
		{ name: 'Basic', columnCount: 4, component: basicRows },
		{ name: 'Scientific', columnCount: 10, component: <>
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
		{ name: 'Programmer', columnCount: 7, component: <>
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
				{operands[operandId].toLocaleString(undefined, {
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

		<SettingsPanel views={views} setView={setView} setIsShowingSeparators={setIsShowingSeparators} setDecimalPlaces={setDecimalPlaces} />
		<PaperTapePanel history={paperTapeHistory} setHistory={setPaperTapeHistory} />
	</>
}