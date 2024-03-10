export default function ScientificButtonGrid() {
	return <>
		<ValueButton symbol='(' />
		<ValueButton symbol=')' />
		<ValueButton symbol='mc' />
		<ValueButton symbol='m+' />
		<ValueButton symbol='m−' />
		<ValueButton symbol='mr' />
		{basicRows[0]}
		<ValueButton symbol='2nd' />
		<ValueButton symbol='x²' />
		<ValueButton symbol='x³' />
		<ValueButton symbol='xⁿ' />
		<ValueButton symbol='eⁿ' />
		<ValueButton symbol='10ⁿ' />
		{basicRows[1]}
		<ValueButton symbol='¹⁄ₓ' />
		<ValueButton symbol='²√x' />
		<ValueButton symbol='³√x' />
		<ValueButton symbol='ⁿ√x' />
		<ValueButton symbol='ln' />
		<ValueButton symbol='log₁₀' />
		{basicRows[2]}
		<ValueButton symbol='x!' />
		<ValueButton symbol='sin' />
		<ValueButton symbol='cos' />
		<ValueButton symbol='tan' />
		<ValueButton symbol='e' />
		<ValueButton symbol='EE' />
		{basicRows[3]}
		<ValueButton isBottomLeft={true} symbol='Rad' />
		<ValueButton symbol='sinh' />
		<ValueButton symbol='cosh' />
		<ValueButton symbol='tanh' />
		<ValueButton symbol='π' />
		<ValueButton symbol='Rand' />
		{basicRows[4]}
	</>
}