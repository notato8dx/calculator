import { useState } from 'react'

export default function useOperands(operandId: number): [number[], (value: number, id?: number) => void] {
	const [state, setState] = useState([0, 0])

	return [state, (value: number, id: number = operandId) => {
		setState([
			...state.slice(0, id),
			value,
			...state.slice(id + 1)
		])
	}]
}