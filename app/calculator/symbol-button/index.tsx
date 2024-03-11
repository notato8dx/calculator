import { Style } from '../utils'
import './styles.css'

const styles = ['operation-button', 'value-button', 'number-button']

export default function SymbolButton({ children, style, isBottomLeft, isLarge, isSelected, ...props }: { style: Style, onClick: () => void, title?: string, isSelected?: boolean, isBottomLeft?: boolean, isLarge?: boolean }) {
	return <button {...props} id={isBottomLeft ? 'bottom-left-button' : undefined} className={`${styles[style]}${isLarge ? ' large-button' : ''}${isSelected ? ' selected' : ''}`}>
		{children}
	</button>
}