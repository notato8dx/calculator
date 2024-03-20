import { JSX, useId } from 'react'
import styles from './styles.module.css'

export default ({
	label,
	...props
}: {
	label: string
} & JSX.IntrinsicElements['select']) => {
	const id = useId()

	return <div className={styles.root}>
		<label htmlFor={id}>
			{label}
		</label>

		<select id={id} {...props} />
	</div>
}