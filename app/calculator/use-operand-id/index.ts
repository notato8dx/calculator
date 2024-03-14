import { useState } from 'react'

export default function useOperandId(enableCanOverwrite: () => void): [number, (id: number) => void] {
	const [state, setState] = useState(0)

	return [state, (id: number) => {
		setState(id)
		enableCanOverwrite()
	}]
}