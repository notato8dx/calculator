import { StrictMode, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Calculator from './calculator'
import PaperTape from './paper-tape'
import Settings from './settings'
import { KeyedPaperTapeEntry, PaperTapeEntry } from './utils'
import views from './views'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
)

let paperTapeKey = 0

function App() {
	const [isShowingSeparators, setIsShowingSeparators] = useState(false)
	const [decimalPlaceCount, setDecimalPlaceCount] = useState(15)
	const [viewId, setViewId] = useState(0)
	const [paperTapeEntries, setPaperTapeEntries] = useState<KeyedPaperTapeEntry[]>([])

	function addPaperTapeEntry(entry: PaperTapeEntry) {
		setPaperTapeEntries([...paperTapeEntries, {
			...entry,
			key: paperTapeKey
		}])

		paperTapeKey++
	}

	return <>
		<Settings setViewId={setViewId} setIsShowingSeparators={setIsShowingSeparators} setDecimalPlaceCount={setDecimalPlaceCount} />
		<Calculator view={views[viewId]} addPaperTapeEntry={addPaperTapeEntry} displayOptions={{ 
			maximumFractionDigits: decimalPlaceCount,
			useGrouping: isShowingSeparators
		}} />
		<PaperTape entries={paperTapeEntries} clear={() => setPaperTapeEntries([])} />
	</>
}