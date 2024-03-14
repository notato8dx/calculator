import { JSX } from 'react'
import { Style } from '../../calculator/utils'
import './styles.css'

const styles = ['operation-button', 'value-button', 'number-button']

export default function Button({ style, isBottomLeft, isLarge, isSelected, ...props }: JSX.IntrinsicElements['button'] & { style: Style, isSelected?: boolean, isBottomLeft?: boolean, isLarge?: boolean }) {
	return <button {...props} id={isBottomLeft ? 'bottom-left-button' : undefined} className={`${styles[style]}${isLarge ? ' large-button' : ''}${isSelected ? ' selected' : ''}`} />
}