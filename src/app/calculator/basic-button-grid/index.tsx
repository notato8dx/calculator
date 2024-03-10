import ClearButton from '../clear-button'
import ClearAllButton from '../clear-all-button'
import DecimalButton from '../decimal-button'
import EqualButton from '../equal-button'
import NegateButton from '../negate-button'
import NumberButton from '../number-button'
import OperationButton from '../operation-button'
import PercentButton from '../percent-button'
import { PaperTapeEntry } from '../../utils'

export default function BasicButtonGrid({ setOperand, operandId, operationId, setOperandAndOperandId, setOperationId, shouldClearAll, setShouldClearAll, handleSetOperand, operands, paperTapeHistory, setPaperTapeHistory }: { setOperand: (value: number, id?: number) => void, operandId: number, operationId: number, setOperandAndOperandId: (value: number, id: number) => void, setOperationId: React.Dispatch<React.SetStateAction<number>>, shouldClearAll: boolean, setShouldClearAll: React.Dispatch<React.SetStateAction<boolean>>, handleSetOperand: (operandId: number) => void, operands: number[], paperTapeHistory: PaperTapeEntry[], setPaperTapeHistory: React.Dispatch<React.SetStateAction<PaperTapeEntry[]>> }) {	
	return <>	
		{shouldClearAll ? <ClearAllButton setOperand={setOperand} setOperandAndOperandId={setOperandAndOperandId} /> : <ClearButton handleSetOperand={handleSetOperand} setOperand={setOperand} setShouldClearAll={setShouldClearAll} />}
		<NegateButton setOperand={setOperand} operandId={operandId} operands={operands} />
		<PercentButton setOperand={setOperand} operandId={operandId} operands={operands} />
		<OperationButton id={3} operandId={operandId} operands={operands} operationId={operationId} setOperationId={setOperationId} setOperandAndOperandId={setOperandAndOperandId} />
		<NumberButton number={7} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand} />
		<NumberButton number={8} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={9} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<OperationButton id={2} operandId={operandId} operands={operands} operationId={operationId} setOperationId={setOperationId} setOperandAndOperandId={setOperandAndOperandId} />
		<NumberButton number={4} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={5} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={6} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<OperationButton id={1} operandId={operandId} operands={operands} operationId={operationId} setOperationId={setOperationId} setOperandAndOperandId={setOperandAndOperandId} />
		<NumberButton number={1} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={2} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={3} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<OperationButton id={0} operandId={operandId} operands={operands} operationId={operationId} setOperationId={setOperationId} setOperandAndOperandId={setOperandAndOperandId} />
		<NumberButton number={0} isLarge isBottomLeft operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<DecimalButton />
		<EqualButton operands={operands} operationId={operationId} paperTapeHistory={paperTapeHistory} setOperandAndOperandId={setOperandAndOperandId} setPaperTapeHistory={setPaperTapeHistory} />
	</>
}