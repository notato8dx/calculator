import GridButton from './'
import { operands, setOperand, setOperandValue, setOperation } from '../state'

export default function OperationGridButton({ operation: newOperation, symbol, setDisplay }) {
	return <GridButton symbol={symbol} onClick={() => {
		setOperation(newOperation)
		setOperand(1)
		setOperandValue(operands[0].value, setDisplay)
	}} />
}