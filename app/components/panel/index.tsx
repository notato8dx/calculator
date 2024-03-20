import { JSX } from 'react'
import styles from './styles.module.css'

export default ({
	children,
	name,
	...props
}: JSX.IntrinsicElements['div'] & {
	name: string
}) => {
	return <div {...props} className={styles.root}>
		<h1>
			{name}
		</h1>

		{children}
	</div>
}