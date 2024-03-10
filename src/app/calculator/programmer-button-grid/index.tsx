export default function ProgrammerButtonGrid() {
	return <>
		<ValueButton symbol='AND' />
		<ValueButton symbol='OR' />
		{...numberRow5}
		<ValueButton symbol='AC' />
		<ValueButton symbol='C' />
		<ValueButton symbol='NOR' />
		<ValueButton symbol='XOR' />
		{...numberRow4}
		<ValueButton symbol='RoL' />
		<ValueButton symbol='RoR' />
		<ValueButton symbol='<<' />
		<ValueButton symbol='>>' />
		{...numberRow3}
		<ValueButton symbol="2's" />
		<ValueButton symbol="1's" />
		<ValueButton symbol='X<<Y' />
		<ValueButton symbol='X>>Y' />
		{...numberRow2}
		{divideButton}
		{subtractButton}
		<ValueButton isLarge={true} symbol='byte flip' />
		{...numberRow1}
		{multiplyButton}
		{addButton}
		<ValueButton isBottomLeft={true} isLarge={true} symbol='word flip' />
		{doubleFButton}
		{zeroButton}
		{doubleZeroButton}
		<EqualButton operands={operands} operation={operation} paperTapeHistory={paperTapeHistory} view={view} setOperandWithValue={setOperandWithValue} setPaperTapeHistory={setPaperTapeHistory} />
	</>
}