import { JSX, useId } from 'react'
import styles from './styles.module.css'

export default ({
	label,
	...props
}: {
	label: string
} & JSX.IntrinsicElements['input']) => {
	const id = useId()

	return <div className={styles.root}>
		<input {...props} id={id} />

		<label htmlFor={id}>
			{label}
		</label>
	</div>
}