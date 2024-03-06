import SymbolButton from './SymbolButton'

export default function ValueButton({ getNewValue, setCurrentValue, currentValue, ...props }: { getNewValue: (value: number) => number, setCurrentValue: (value: number) => void, currentValue: number, symbol: string }) {
	return <SymbolButton {...props} className='value-button' onClick={() => {
		setCurrentValue(getNewValue(currentValue))
	}}></SymbolButton>
}