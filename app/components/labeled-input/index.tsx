import { JSX, useId } from 'react'
import styles from './styles.module.css'

export default ({
	children,
	...props
}: JSX.IntrinsicElements['input']) => {
	const id = useId()

	return <div className={styles.root}>
		<input {...props} id={id} />

		<label htmlFor={id}>
			{children}
		</label>
	</div>
}