import { Fragment, RefObject, useEffect, useRef } from 'react'
import Panel from '../panel'
import operations from '../operations'
import { KeyedPaperTapeEntry } from '../utils'

export default function PaperTape({ entries, clear }: { entries: KeyedPaperTapeEntry[], clear: () => void }) {
	const paperTapeRef = useRef<Element>(null!)

	useEffect(() => {
		paperTapeRef.current.scrollIntoView()
	}, [entries])

	return <Panel name='Paper Tape'>
		<div style={{ overflowY: 'scroll', height: '200px' }}>
			{entries.map((entry) => {
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

		<button style={{ display: 'block', marginLeft: 'auto' }} onClick={clear}>
			Clear
		</button>
	</Panel>
}