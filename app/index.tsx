import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { DecimalPlacesSelect, LabeledInput, Main, Panel, PaperTape } from './components'
import { views } from './data'
import { PaperTapeEntry } from './types'
import styles from './styles.module.css'

createRoot(
	document.getElementById('root')!
)
.render(
	<StrictMode>
		<App />
	</StrictMode>
)

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

			<DecimalPlacesSelect onChange={({ target: { value } }: { target: { value: string } }) => {
				setDecimalPlaceCount(
					parseInt(value)
				)
			}} />
		</Panel>

		<div className={styles.calculator}>
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
			<div className={styles.paperTape}>
				<PaperTape entries={paperTapeEntries} />
			</div>

			<button className={styles.paperTapeButton} onClick={() => {
				setPaperTapeEntries([])
			}}>
				Clear
			</button>
		</Panel>
	</>
}