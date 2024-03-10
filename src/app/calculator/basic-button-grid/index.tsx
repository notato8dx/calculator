import ClearButton from '../clear-button'
import ClearAllButton from '../clear-all-button'
import DecimalButton from '../decimal-button'
import EqualButton from '../equal-button'
import NegateButton from '../negate-button'
import NumberButton from '../number-button'
import OperationButton from '../operation-button'
import PercentButton from '../percent-button'

export default function BasicButtonGrid({ setOperandValue, operandId, operationId, setOperandWithValue, setOperationId, shouldClearAll, setShouldClearAll, handleSetOperand, operands, paperTapeHistory, setPaperTapeHistory, view }) {
	function setCurrentValue(value: number) {
		setOperandValue(operandId, value)
	}

	const operand = operands[operandId]
	
	return <>	
		{shouldClearAll ? <ClearAllButton setOperandValue={setOperandValue} setOperandWithValue={setOperandWithValue} /> : <ClearButton operandId={operandId} handleSetOperand={handleSetOperand} setOperandValue={setOperandValue} setShouldClearAll={setShouldClearAll} />}
		<NegateButton setCurrentValue={setCurrentValue} currentValue={operand} />
		<PercentButton setCurrentValue={setCurrentValue} currentValue={operand} />
		<OperationButton id={3} operandId={operandId} operands={operands} operationId={operationId} setOperationId={setOperationId} setOperandWithValue={setOperandWithValue} />
		<NumberButton number={7} operandId={operandId} operands={operands} view={view} setShouldClearAll={setShouldClearAll} setOperandValue={setOperandValue} />
		<NumberButton number={8} operandId={operandId} operands={operands} view={view} setShouldClearAll={setShouldClearAll} setOperandValue={setOperandValue}/>
		<NumberButton number={9} operandId={operandId} operands={operands} view={view} setShouldClearAll={setShouldClearAll} setOperandValue={setOperandValue}/>
		<OperationButton id={2} operandId={operandId} operands={operands} operationId={operationId} setOperationId={setOperationId} setOperandWithValue={setOperandWithValue} />
		<NumberButton number={4} operandId={operandId} operands={operands} view={view} setShouldClearAll={setShouldClearAll} setOperandValue={setOperandValue}/>
		<NumberButton number={5} operandId={operandId} operands={operands} view={view} setShouldClearAll={setShouldClearAll} setOperandValue={setOperandValue}/>
		<NumberButton number={6} operandId={operandId} operands={operands} view={view} setShouldClearAll={setShouldClearAll} setOperandValue={setOperandValue}/>
		<OperationButton id={1} operandId={operandId} operands={operands} operationId={operationId} setOperationId={setOperationId} setOperandWithValue={setOperandWithValue} />
		<NumberButton number={1} operandId={operandId} operands={operands} view={view} setShouldClearAll={setShouldClearAll} setOperandValue={setOperandValue}/>
		<NumberButton number={2} operandId={operandId} operands={operands} view={view} setShouldClearAll={setShouldClearAll} setOperandValue={setOperandValue}/>
		<NumberButton number={3} operandId={operandId} operands={operands} view={view} setShouldClearAll={setShouldClearAll} setOperandValue={setOperandValue}/>
		<OperationButton id={0} operandId={operandId} operands={operands} operationId={operationId} setOperationId={setOperationId} setOperandWithValue={setOperandWithValue} />
		<NumberButton number={0} operandId={operandId} operands={operands} view={view} setShouldClearAll={setShouldClearAll} setOperandValue={setOperandValue}/>
		<DecimalButton />
		<EqualButton operands={operands} operationId={operationId} paperTapeHistory={paperTapeHistory} view={view} setOperandWithValue={setOperandWithValue} setPaperTapeHistory={setPaperTapeHistory} />
	</>
}