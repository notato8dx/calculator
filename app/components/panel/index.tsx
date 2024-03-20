import { JSX } from 'react'
import styles from './styles.module.css'

export default ({
	name,
	...props
}: JSX.IntrinsicElements['div'] & {
	name: string
}) => {
	return <div className={styles.root}>
			<h1 style={{ }}>
				{name}
			</h1>

		<div {...props} />
	</div>
}