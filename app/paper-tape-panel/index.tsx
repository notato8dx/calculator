import { Fragment, RefObject, useEffect, useRef } from 'react'
import Panel from '../panel'
import { PaperTapeEntry, operations } from '../utils'

export default function PaperTape({ history, clearHistory }: { history: PaperTapeEntry[], clearHistory: () => void }) {
	const paperTapeRef = useRef<Element>(null!)

	useEffect(() => {
		paperTapeRef.current.scrollIntoView()
	}, [history])

	return <Panel name='Paper Tape'>
		<div style={{ overflowY: 'scroll', height: '200px' }}>
			{history.map((entry) => {
				return <Fragment key={entry.key}>
					{`${entry.operands[0]} ${operations[entry.operationId].symbolASCII} ${entry.operands[1]}`}
					<br />
					{`= ${entry.value}`}
					<br />
					<br />
				</Fragment>
			})}

			<div ref={paperTapeRef as RefObject<HTMLDivElement>} />
		</div>

		<button style={{ display: 'block', marginLeft: 'auto' }} onClick={clearHistory}>
			Clear
		</button>
	</Panel>
}