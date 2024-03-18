import { StrictMode, useState } from 'react'
import { createRoot}  from 'react-dom/client'
import Main from './main'
import Panel from './panel'
import PaperTape from './paper-tape'
import LabeledInput from './labeled-input'
import * as views from './views'
import PaperTapeEntry from './paper-tape-entry'
import './style.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
)

let paperTapeKey = 0

function App() {
	const [isShowingSeparators, setIsShowingSeparators] = useState(false)
	const [decimalPlaceCount, setDecimalPlaceCount] = useState(15)
	const [view, setView] = useState(views.basic)
	const [paperTapeEntries, setPaperTapeEntries] = useState<PaperTapeEntry[]>([])

	return <>
		<Panel name='Settings'>
			{Object.entries(views).map(([key, view]) => <LabeledInput
				key={key}
				type='radio'
				name='view'
				defaultChecked={key == 'basic'}
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

		<div id='calculator'>
			<Main
				view={view}
				addPaperTapeEntry={(entry) => {
					setPaperTapeEntries([...paperTapeEntries, {
						...entry,
						key: paperTapeKey
					}])
			
					paperTapeKey++
				}}
				displayOptions={{ 
					maximumFractionDigits: decimalPlaceCount,
					useGrouping: isShowingSeparators
				}}
			/>
		</div>

		<Panel name='Paper Tape'>
			<div style={{ overflowY: 'scroll', height: '200px' }}>
				<PaperTape entries={paperTapeEntries} />
			</div>

			<button style={{ display: 'block', marginLeft: 'auto' }} onClick={() => {
				setPaperTapeEntries([])
			}}>
				Clear
			</button>
		</Panel>
	</>
}