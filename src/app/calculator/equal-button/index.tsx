import SymbolButton from '../symbol-button'
import { Style } from '../utils'
import { PaperTapeEntry, operations } from '../../utils'

let paperTapeKey = 0

export default function EqualButton({ operands, operationId, paperTapeHistory, setOperandAndOperandId, setPaperTapeHistory, isLarge }: { operands: number[], operationId: number, paperTapeHistory: PaperTapeEntry[], setOperandAndOperandId: (value: number, id: number) => void, setPaperTapeHistory: React.Dispatch<React.SetStateAction<PaperTapeEntry[]>>, isLarge?: boolean }) {
	return <SymbolButton isLarge={isLarge} style={Style.Operation} symbol='=' onClick={() => {
		const value = operations[operationId].function(operands)

		setPaperTapeHistory([...paperTapeHistory, {
			operands: [...operands],
			operationId,
			value,
			key: paperTapeKey
		}])

		paperTapeKey++

		setOperandAndOperandId(value, 0)
	}} />
}