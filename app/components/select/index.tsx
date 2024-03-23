import { JSX, useId } from 'react'
import styles from './styles.module.css'

export default ({
	label,
	handleChange,
	...props
}: {
	label: string
	handleChange: (value: string) => void
} & JSX.IntrinsicElements['select']) => {
	const id = useId()

	return <div className={styles.root}>
		<label htmlFor={id}>
			{label}
		</label>

		<select {...props} id={id} onChange={({ target: { value } }) => {
			handleChange(value)
		}} />
	</div>
}