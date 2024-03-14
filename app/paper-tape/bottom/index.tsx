import { RefObject, useEffect, useRef } from 'react'
import { PaperTapeEntry } from '../../utils'

export default function Bottom({ entries }: { entries: PaperTapeEntry[] }) {
	const paperTapeRef = useRef<Element>(null!)

	useEffect(() => {
		paperTapeRef.current.scrollIntoView()
	}, [entries])

	return <div ref={paperTapeRef as RefObject<HTMLDivElement>} />
}