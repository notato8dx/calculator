import SymbolButton from '../symbol-button'
import { Style } from '../utils'

export default function ValueButton({ getNewValue, setCurrentValue, currentValue, ...props }: { getNewValue: (value: number) => number, setCurrentValue: (value: number) => void, isBottomLeft?: boolean, isLarge?: boolean, currentValue: number, symbol: string }) {
	return <SymbolButton {...props} style={Style.Value} onClick={() => {
		setCurrentValue(getNewValue(currentValue))
	}}></SymbolButton>
}