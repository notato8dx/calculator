import { StrictMode, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Calculator from './calculator'
import PaperTapePanel from './paper-tape-panel'
import SettingsPanel from './settings-panel'
import { PaperTapeEntry, PaperTapeData, views } from './utils'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
)

let paperTapeKey = 0

function App() {
	const [isShowingSeparators, setIsShowingSeparators] = useState(false)
	const [decimalPlaces, setDecimalPlaces] = useState(15)
	const [viewId, setViewId] = useState(0)
	const [paperTapeHistory, setPaperTapeHistory] = useState<PaperTapeEntry[]>([])

	function addPaperTapeEntry(data: PaperTapeData) {
		setPaperTapeHistory([...paperTapeHistory, {
			...data,
			key: paperTapeKey
		}])

		paperTapeKey++
	}

	return <>
		<Calculator localeStringOptions={{ 
			maximumFractionDigits: decimalPlaces,
			useGrouping: isShowingSeparators
		}} view={views[viewId]} addPaperTapeEntry={addPaperTapeEntry} />
		
		<SettingsPanel setViewId={setViewId} setIsShowingSeparators={setIsShowingSeparators} setDecimalPlaces={setDecimalPlaces} />
		<PaperTapePanel history={paperTapeHistory} clearHistory={() => setPaperTapeHistory([])} />
	</>
}