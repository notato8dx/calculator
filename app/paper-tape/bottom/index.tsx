import { RefObject, useEffect, useRef } from 'react'
import PaperTapeEntry from '../../paper-tape-entry'

export default ({
	entries
}: {
	entries: PaperTapeEntry[]
}) => {
	const paperTapeRef = useRef<Element>(null!)

	useEffect(() => {
		paperTapeRef.current.scrollIntoView()
	}, [entries])

	return <div ref={paperTapeRef as RefObject<HTMLDivElement>} />
}