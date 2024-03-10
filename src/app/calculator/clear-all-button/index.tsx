import SymbolButton from '../symbol-button'
import { Style } from '../utils'

export default function ClearAllButton({ setOperand, setOperandAndOperandId }: { setOperand: (operandId: number, value: number) => void, setOperandAndOperandId: (value: number, id: number) => void }) {
	return <SymbolButton symbol={'AC'} style={Style.Value} onClick={() => {
		setOperand(0, 1)
		setOperandAndOperandId(0, 0)
	}} />
}