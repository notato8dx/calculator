import { JSX, useId } from 'react'
import styles from './styles.module.css'

export default (props: JSX.IntrinsicElements['select']) => {
	const id = useId()

	return <>
		<label className={styles.label} htmlFor={id}>
			Decimal Places
		</label>

		<select id={id} defaultValue={15} {...props}>
			{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(number => {
				return <option
					value={number}
					key={number}
				>
					{number}
				</option>
			})}
		</select>
	</>
}