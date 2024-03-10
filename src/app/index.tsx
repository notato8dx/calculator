import { useState } from 'react'
import Calculator from './calculator'
import PaperTapePanel from './paper-tape-panel'
import SettingsPanel from './settings-panel'
import { PaperTapeEntry, View } from './utils'
import './styles.css'

export default function App() {
	const [isShowingSeparators, setIsShowingSeparators] = useState(false)
	const [decimalPlaces, setDecimalPlaces] = useState(15)
	const [viewId, setViewId] = useState(View.Basic)
	const [paperTapeHistory, setPaperTapeHistory] = useState<PaperTapeEntry[]>([])

	return <>
		<Calculator decimalPlaces={decimalPlaces} isShowingSeparators={isShowingSeparators} view={viewId} paperTapeHistory={paperTapeHistory} setPaperTapeHistory={setPaperTapeHistory} />
		<SettingsPanel setView={setViewId} setIsShowingSeparators={setIsShowingSeparators} setDecimalPlaces={setDecimalPlaces} />
		<PaperTapePanel history={paperTapeHistory} setHistory={setPaperTapeHistory} />
	</>
}