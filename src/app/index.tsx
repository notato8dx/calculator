import { useState } from 'react'
import Calculator from './calculator'
import PaperTapePanel from './paper-tape-panel'
import SettingsPanel from './settings-panel'
import { PaperTapeEntry, views } from './utils'

let paperTapeKey = 0

export default function App() {
	const [isShowingSeparators, setIsShowingSeparators] = useState(false)
	const [decimalPlaces, setDecimalPlaces] = useState(15)
	const [viewId, setViewId] = useState(0)
	const [paperTapeHistory, setPaperTapeHistory] = useState<PaperTapeEntry[]>([])

	function addPaperTapeEntry(operands, operationId, value) {
		setPaperTapeHistory([...paperTapeHistory, {
			operands: [...operands],
			operationId,
			value,
			key: paperTapeKey
		}])

		paperTapeKey++
	}

	return <>
		<Calculator localeStringOptions={{ 
			maximumFractionDigits: decimalPlaces,
			useGrouping: isShowingSeparators
		}} view={views[viewId]} addPaperTapeEntry={addPaperTapeEntry} />
		
		<SettingsPanel setView={setViewId} setIsShowingSeparators={setIsShowingSeparators} setDecimalPlaces={setDecimalPlaces} />
		<PaperTapePanel history={paperTapeHistory} setHistory={setPaperTapeHistory} />
	</>
}