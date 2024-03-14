import Bottom from './bottom'
import { Fragment } from 'react'
import { PaperTapeEntry } from '../utils'
import operations from '../operations'

export default function PaperTape({ entries }: { entries: PaperTapeEntry[] }) {
	return <>
		{entries.map((entry) => {
			return <Fragment key={entry.key}>
				{`${entry.operands[0]} ${operations[entry.operationId].symbolASCII} ${entry.operands[1]}`}
				<br />
				{`= ${entry.value}`}
				<br />
				<br />
			</Fragment>
		})}

		<Bottom entries={entries} />
	</>
}