import EqualButton from '../equal-button'
import NumberButton from '../number-button'
import OperationButton from '../operation-button'
import ValueButton from '../value-button'
import { PaperTapeEntry } from '../../utils'

export default function ProgrammerButtonGrid({ setOperand, operandId, operationId, setOperandAndOperandId, setOperationId, shouldClearAll, setShouldClearAll, handleSetOperand, operands, paperTapeHistory, setPaperTapeHistory }: { setOperand: (value: number, operandId?: number) => void, operandId: number, operationId: number, setOperandAndOperandId: (value: number, id: number) => void, setOperationId: React.Dispatch<React.SetStateAction<number>>, shouldClearAll: boolean, setShouldClearAll: React.Dispatch<React.SetStateAction<boolean>>, handleSetOperand: (operandId: number) => void, operands: number[], paperTapeHistory: PaperTapeEntry[], setPaperTapeHistory: React.Dispatch<React.SetStateAction<PaperTapeEntry[]>> }) {
	return <>
		<ValueButton symbol='AND' />
		<ValueButton symbol='OR' />
		<NumberButton number={0xd} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={0xe} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={0xf} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<ValueButton symbol='AC' />
		<ValueButton symbol='C' />
		<ValueButton symbol='NOR' />
		<ValueButton symbol='XOR' />
		<NumberButton number={0xa} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={0xb} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={0xc} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<ValueButton symbol='RoL' />
		<ValueButton symbol='RoR' />
		<ValueButton symbol='<<' />
		<ValueButton symbol='>>' />
		<NumberButton number={0x7} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={0x8} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={0x9} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<ValueButton symbol="2's" />
		<ValueButton symbol="1's" />
		<ValueButton symbol='X<<Y' />
		<ValueButton symbol='X>>Y' />
		<NumberButton number={0x4} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={0x5} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={0x6} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<OperationButton id={3} operandId={operandId} operands={operands} operationId={operationId} setOperationId={setOperationId} setOperandAndOperandId={setOperandAndOperandId} />
		<OperationButton id={1} operandId={operandId} operands={operands} operationId={operationId} setOperationId={setOperationId} setOperandAndOperandId={setOperandAndOperandId} />
		<ValueButton isLarge={true} symbol='byte flip' />
		<NumberButton number={0x1} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={0x2} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={0x3} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<OperationButton id={2} operandId={operandId} operands={operands} operationId={operationId} setOperationId={setOperationId} setOperandAndOperandId={setOperandAndOperandId} />
		<OperationButton id={0} operandId={operandId} operands={operands} operationId={operationId} setOperationId={setOperationId} setOperandAndOperandId={setOperandAndOperandId} />
		<ValueButton isBottomLeft={true} isLarge={true} symbol='word flip' />
		<NumberButton number={0xf} isDouble operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={0x0} operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<NumberButton number={0x0} isDouble operandId={operandId} operands={operands} setShouldClearAll={setShouldClearAll} setOperand={setOperand}/>
		<EqualButton operands={operands} isLarge operationId={operationId} paperTapeHistory={paperTapeHistory} setOperandAndOperandId={setOperandAndOperandId} setPaperTapeHistory={setPaperTapeHistory} />
	</>
}