import ClearButton from '../clear-button'
import ClearAllButton from '../clear-all-button'
import DecimalButton from '../decimal-button'
import EqualButton from '../equal-button'
import NegateButton from '../negate-button'
import NumberButton from '../number-button'
import OperationButton from '../operation-button'
import PercentButton from '../percent-button'
import ValueButton from '../value-button'
import { PaperTapeEntry } from '../../utils'

export default function ScientificButtonGrid({ setOperand, operandId, operationId, setOperandAndOperandId, setOperationId, shouldClearAll, setShouldClearAll, handleSetOperand, operands, paperTapeHistory, setPaperTapeHistory }: { setOperand: (value: number, operandId?: number) => void, operandId: number, operationId: number, setOperandAndOperandId: (value: number, id: number) => void, setOperationId: React.Dispatch<React.SetStateAction<number>>, shouldClearAll: boolean, setShouldClearAll: React.Dispatch<React.SetStateAction<boolean>>, handleSetOperand: (operandId: number) => void, operands: number[], paperTapeHistory: PaperTapeEntry[], setPaperTapeHistory: React.Dispatch<React.SetStateAction<PaperTapeEntry[]>> }) {
	return <>
		<ValueButton symbol='(' />
		<ValueButton symbol=')' />
		<ValueButton symbol='mc' />
		<ValueButton symbol='m+' />
		<ValueButton symbol='m−' />
		<ValueButton symbol='mr' />
		{shouldClearAll ? <ClearAllButton setOperand={setOperand} setOperandAndOperandId={setOperandAndOperandId} /> : <ClearButton handleSetOperand={handleSetOperand} setOperand={setOperand} setShouldClearAll={setShouldClearAll} />}
		<NegateButton setOperand={setOperand} operandId={operandId} operands={operands} />
		<PercentButton setOperand={setOperand} operandId={operandId} operands={operands} />
		<OperationButton id={3} operandId={operandId} operands={operands} operationId={operationId} setOperationId={setOperationId} setOperandAndOperandId={setOperandAndOperandId} />
		<ValueButton symbol='2nd' />
		<ValueButton symbol='x²' />
		<ValueButton symbol='x³' />
		<ValueButton symbol='xⁿ' />
		<ValueButton symbol='eⁿ' />
		<ValueButton symbol='10ⁿ' />
		<NumberButton number={7} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand} />
		<NumberButton number={8} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={9} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<OperationButton id={2} operandId={operandId} operands={operands} operationId={operationId} setOperationId={setOperationId} setOperandAndOperandId={setOperandAndOperandId} />
		<ValueButton symbol='¹⁄ₓ' />
		<ValueButton symbol='²√x' />
		<ValueButton symbol='³√x' />
		<ValueButton symbol='ⁿ√x' />
		<ValueButton symbol='ln' />
		<ValueButton symbol='log₁₀' />
		<NumberButton number={4} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={5} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={6} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<OperationButton id={1} operandId={operandId} operands={operands} operationId={operationId} setOperationId={setOperationId} setOperandAndOperandId={setOperandAndOperandId} />
		<ValueButton symbol='x!' />
		<ValueButton symbol='sin' />
		<ValueButton symbol='cos' />
		<ValueButton symbol='tan' />
		<ValueButton symbol='e' />
		<ValueButton symbol='EE' />
		<NumberButton number={1} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={2} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={3} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<OperationButton id={0} operandId={operandId} operands={operands} operationId={operationId} setOperationId={setOperationId} setOperandAndOperandId={setOperandAndOperandId} />
		<ValueButton isBottomLeft symbol='Rad' />
		<ValueButton symbol='sinh' />
		<ValueButton symbol='cosh' />
		<ValueButton symbol='tanh' />
		<ValueButton symbol='π' />
		<ValueButton symbol='Rand' />
		<NumberButton number={0} isLarge operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<DecimalButton />
		<EqualButton operands={operands} operationId={operationId} paperTapeHistory={paperTapeHistory} setOperandAndOperandId={setOperandAndOperandId} setPaperTapeHistory={setPaperTapeHistory} />
	</>
}