import { Fragment, StrictMode, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Select, Input, List, Main, Panel } from './components'
import { views } from './data'
import { PaperTapeEntry } from './types'
import styles from './styles.module.css'

createRoot(
	document.getElementById('app-container')!
)
.render(
	<StrictMode>
		<App />
	</StrictMode>
)

function App() {
	const [isShowingSeparators, setIsShowingSeparators] = useState(false)
	const [decimalPlaceCount, setDecimalPlaceCount] = useState(15)
	const [view, setView] = useState(views[0]!)
	const [paperTapeEntries, setPaperTapeEntries] = useState<PaperTapeEntry[]>([])
	const paperTapeKey = useRef(0)

	return <>
		<Panel style={{ padding: '8px' }} name='Settings'>
			{views.map((view, id) => <Input
				key={id}
				label={view.name}
				type='radio'
				name='view'
				defaultChecked={id == 0}
				onChange={() => {
					setView(view)
				}}
			/>)}

			<hr />

			<Input
				label='Show Thousands Separators'
				type='checkbox'
				onChange={({ target: { checked } }) => {
					setIsShowingSeparators(checked)
				}}
			/>

			<hr />

			<Select
				label='Decimal Places'
				defaultValue={15}
				onChange={({ target: { value } }) => {
					setDecimalPlaceCount(
						parseInt(value)
					)
				}}
			>
				{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(number => {
					return <option
						value={number}
						key={number}
					>
						{number}
					</option>
				})}
			</Select>
		</Panel>

		<div className={styles.calculator}>
			<Main
				view={view}
				addPaperTapeEntry={(entry) => {
					setPaperTapeEntries([
						...paperTapeEntries,
						{
							...entry,
							key: paperTapeKey.current
						}
					])
			
					paperTapeKey.current++
				}}
				displayOptions={{ 
					maximumFractionDigits: decimalPlaceCount,
					useGrouping: isShowingSeparators
				}}
			/>
		</div>

		<Panel name='Paper Tape' className={styles.paperTape}>
			<List className={styles.list}>
				{paperTapeEntries.map(({ operands, operator, value, key }) => {
					return <Fragment key={key}>
						{`${operands[0]} ${operator} ${operands[1]}`}
						<br />
						{`= ${value}`}
						<br />
						<br />
					</Fragment>
				})}
			</List>
			
			<div className={styles.footer}>
				<button onClick={() => {
					setPaperTapeEntries([])
				}}>
					Clear
				</button>
			</div>
		</Panel>
	</>
}