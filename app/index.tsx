import { StrictMode, useState } from 'react'
import { createRoot}  from 'react-dom/client'
import Calculator from './calculator'
import Panel from './panel'
import PaperTape from './paper-tape'
import LabeledInput from './labeled-input'
import views from './views'
import { PaperTapeEntry } from './utils'
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
	const [viewId, setViewId] = useState(0)
	const [paperTapeEntries, setPaperTapeEntries] = useState<PaperTapeEntry[]>([])

	return <>
		<Panel name='Settings'>
			{views.map(({ name }, id) => {
				return <LabeledInput
					key={id}
					type='radio'
					id={`settings-view-${id}`}
					value={id}
					name='view'
					defaultChecked={id == 0}
					onChange={({ target: { value } }) => {
						setViewId(parseInt(value))
					}}
				>
					{name}
				</LabeledInput>
			})}

			<hr />

			<LabeledInput type='checkbox' id='settings-separators' onChange={({ target: { checked } }) => {
				setIsShowingSeparators(checked)
			}}>
				Show Thousands Separators
			</LabeledInput>

			<hr />

			<LabeledInput type='number' min={0} max={15} defaultValue={15} id='settings-decimal' onChange={({ target: { value } }) => {
				setDecimalPlaceCount(parseInt(value))
			}}>
				Decimal Places
			</LabeledInput>
		</Panel>

		<div id='calculator'>
			<Calculator
				viewId={viewId}
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