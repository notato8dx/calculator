import { Style } from '../types'

const styles = ['operation-button', 'value-button', 'number-button']

export default function SymbolButton({ symbol, style, isBottomLeft, isLarge, isSelected, ...props }: { symbol: string, style: Style, onClick: () => void, isSelected: boolean, isBottomLeft: boolean, isLarge: boolean, className?: string }) {
	return <button {...props} id={isBottomLeft ? 'bottom-left-button' : undefined} className={`${styles[style]}${isLarge ? ' large-button' : ''}${isSelected ? ' selected' : ''}`}>
		{symbol}
	</button>
}