import { JSX } from 'react'
import styles from './styles.module.css'

export default ({
	variant,
	isBottomLeft,
	isLarge,
	isSelected,
	...props
 }: JSX.IntrinsicElements['button'] & {
	variant: 'operation' | 'value' | 'number'
	isSelected?: boolean
	isBottomLeft?: boolean
	isLarge?: boolean
}) => {
	return <button
		{...props}
		className={[
			styles[variant],
			isBottomLeft ? styles.bottomLeft : null,
			isLarge ? styles.large : null,
			isSelected ? styles.selected : null,
		].join(' ')}
	/>
}