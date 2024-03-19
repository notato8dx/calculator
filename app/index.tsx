import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Main from './main'
import PaperTape from './paper-tape'
import { Button, LabeledInput, Panel } from './components'
import style from './style.module.css'
import { Operation, PaperTapeEntry } from './types'
import './style.css'

createRoot(
	document.getElementById('root')!
)
.render(
	<StrictMode>
		<App />
	</StrictMode>
)

const operations: [Operation, Operation, Operation, Operation] = [
	{
		symbol: '+',
		symbolASCII: '+',
		operate: operands => operands[0] + operands[1]
	},
	{
		symbol: '−',
		symbolASCII: '-',
		operate: operands => operands[0] - operands[1]
	},
	{
		symbol: '×',
		symbolASCII: '*', 
		operate: operands => operands[0] * operands[1]
	},
	{
		symbol: '÷',
		symbolASCII: '/',
		operate: operands => operands[0] / operands[1]
	}
]

const views = [
	{
		name: 'Basic',
		columnCount: 4,
		Buttons: ({
			isOperationSelected,
			handleOperation,
			handleNumber,
			handleClear,
			handleClearAll,
			handleValue,
			handleEqual,
			handleDecimal
		}: {
			isOperationSelected: boolean,
			handleOperation: (setOperation: (operation: Operation) => void) => (operation: Operation) => void,
			handleNumber: (number: number) => void,
			handleClear: () => void,
			handleClearAll: () => void,
			handleValue: (getNewValue: (value: number) => number) => void
			handleEqual: (operation: Operation) => () => void
			handleDecimal: () => void
		}) => {
			const [operation, setOperation] = useState(operations[0])
			const [shouldClearAll, setShouldClearAll] = useState(true)
		
			const [addButton, subtractButton, multiplyButton, divideButton] = operations.map(o => {
				return <Button variant='operation' isSelected={isOperationSelected && o == operation} onClick={() => handleOperation(setOperation)(o)}>
					{o.symbol}
				</Button>
			})
		
			const numberButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, id) => {
				return <Button isLarge={id == 0} isBottomLeft={id == 0} variant='number' onClick={() => {
					handleNumber(number)
					setShouldClearAll(false)
				}}>
					{number.toString(16).toUpperCase()}
				</Button>
			})
		
			return <>
				{shouldClearAll ?
					<Button variant='value' onClick={handleClearAll}>
						AC
					</Button>
				:
					<Button variant='value' onClick={() => {
						handleClear()
						setShouldClearAll(true)
					}}>
						C
					</Button>
				}
		
				<Button variant='value' onClick={() => handleValue(value => -value)}>
					⁺⁄₋
				</Button>
		
				<Button variant='value' onClick={() => handleValue(value => value / 100)}>
					%
				</Button>
		
				{divideButton}
				{numberButtons[7]}
				{numberButtons[8]}
				{numberButtons[9]}
				{numberButtons[29]}
				{multiplyButton}
				{numberButtons[4]}
				{numberButtons[5]}
				{numberButtons[6]}
				{subtractButton}
				{numberButtons[1]}
				{numberButtons[2]}
				{numberButtons[3]}
				{addButton}
				{numberButtons[0]}
		
				<Button variant='number' onClick={handleDecimal}>
					.
				</Button>
		
				<Button variant='operation' onClick={handleEqual(operation)}>
					=
				</Button>
			</>
		}
	},
	{
		name: 'Scientific',
		columnCount: 10,
		Buttons: () => {
			return <></>
		}
	},
	{
		name: 'Programmer',
		columnCount: 7,
		Buttons: () => {
			return <></>
		}
	}
]

let paperTapeKey = 0

function App() {
	const [isShowingSeparators, setIsShowingSeparators] = useState(false)
	const [decimalPlaceCount, setDecimalPlaceCount] = useState(15)
	const [view, setView] = useState(views[0]!)
	const [paperTapeEntries, setPaperTapeEntries] = useState<PaperTapeEntry[]>([])

	return <>
		<Panel name='Settings'>
			{views.map((view, id) => <LabeledInput
				key={id}
				type='radio'
				name='view'
				defaultChecked={id == 0}
				onChange={() => {
					setView(view)
				}}
			>
				{view.name}
			</LabeledInput>)}

			<hr />

			<LabeledInput
				type='checkbox'
				onChange={({ target: { checked } }) => {
					setIsShowingSeparators(checked)
				}}
			>
				Show Thousands Separators
			</LabeledInput>

			<hr />

			<LabeledInput
				type='number'
				min={0}
				max={15}
				defaultValue={15}
				onChange={({ target: { value } }) => {
					setDecimalPlaceCount(
						parseInt(value)
					)
				}}
			>
				Decimal Places
			</LabeledInput>
		</Panel>

		<div id={style.calculator}>
			<Main
				view={view}
				addPaperTapeEntry={(entry) => {
					setPaperTapeEntries([
						...paperTapeEntries,
						{
							...entry,
							key: paperTapeKey
						}
					])
			
					paperTapeKey++
				}}
				displayOptions={{ 
					maximumFractionDigits: decimalPlaceCount,
					useGrouping: isShowingSeparators
				}}
			/>
		</div>

		<Panel name='Paper Tape'>
			<div id={style.paperTape}>
				<PaperTape entries={paperTapeEntries} />
			</div>

			<button id={style.paperTapeButton} onClick={() => {
				setPaperTapeEntries([])
			}}>
				Clear
			</button>
		</Panel>
	</>
}