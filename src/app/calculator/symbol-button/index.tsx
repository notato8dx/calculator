import { Style } from '../utils'

const styles = ['operation-button', 'value-button', 'number-button']

export default function SymbolButton({ symbol, style, isBottomLeft, isLarge, isSelected, ...props }: { symbol: string, style: Style, onClick: () => void, title?: string, isSelected?: boolean, isBottomLeft?: boolean, isLarge?: boolean }) {
	return <button {...props} id={isBottomLeft ? 'bottom-left-button' : undefined} className={`${styles[style]}${isLarge ? ' large-button' : ''}${isSelected ? ' selected' : ''}`}>
		{symbol}
	</button>
}