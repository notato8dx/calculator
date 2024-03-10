import { useState } from 'react'
import Calculator from './calculator'
import PaperTapePanel from './paper-tape-panel'
import SettingsPanel from './settings-panel'
import { PaperTapeEntry, View } from './utils'
import './styles.css'

export default function App() {
	const [isShowingSeparators, setIsShowingSeparators] = useState(false)
	const [decimalPlaces, setDecimalPlaces] = useState(15)
	const [view, setView] = useState(View.Basic)
	const [paperTapeHistory, setPaperTapeHistory] = useState<PaperTapeEntry[]>([])

	return <>
		<Calculator decimalPlaces={decimalPlaces} isShowingSeparators={isShowingSeparators} view={view} paperTapeHistory={paperTapeHistory} setPaperTapeHistory={setPaperTapeHistory} />
		<SettingsPanel setView={setView} setIsShowingSeparators={setIsShowingSeparators} setDecimalPlaces={setDecimalPlaces} />
		<PaperTapePanel history={paperTapeHistory} setHistory={setPaperTapeHistory} />
	</>
}