import SymbolButton from '../symbol-button'
import { Style } from '../utils'

export default function ValueButton({ getNewValue, setOperand, operandId, operands, ...props }: { getNewValue: (value: number) => number, setOperand: (value: number, id?: number) => void, isBottomLeft?: boolean, isLarge?: boolean, operandId: number, operands: number[], symbol: string }) {
	return <SymbolButton {...props} style={Style.Value} onClick={() => {
		setOperand(getNewValue(operands[operandId]))
	}}></SymbolButton>
}