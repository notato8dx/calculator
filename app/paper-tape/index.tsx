import Bottom from './bottom'
import { Fragment } from 'react'
import PaperTapeEntry from '../paper-tape-entry'

export default ({
	entries
}: {
	entries: PaperTapeEntry[]
}) => {
	return <>
		{entries.map(({ operands, operator, value, key }) => {
			return <Fragment key={key}>
				{`${operands[0]} ${operator} ${operands[1]}`}
				<br />
				{`= ${value}`}
				<br />
				<br />
			</Fragment>
		})}

		<Bottom entries={entries} />
	</>
}