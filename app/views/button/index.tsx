import { JSX } from 'react'
import style from './style.module.css'

export default ({ variant, isBottomLeft, isLarge, isSelected, ...props }: JSX.IntrinsicElements['button'] & {
	variant: 'operation' | 'value' | 'number'
	isSelected?: boolean
	isBottomLeft?: boolean
	isLarge?: boolean
}) => {
	return <button
		{...props}
		id={isBottomLeft ? style.bottomLeft : undefined}
		className={[
			{
				operation: style.operation,
				value: style.value,
				number: style.number
			}[variant],
			isLarge ? style.large : null,
			isSelected ? style.selected : null
		].join(' ')}
	/>
}