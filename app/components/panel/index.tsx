import { JSX } from 'react'
import styles from './styles.module.css'

export default ({
	children,
	className,
	name,
	...props
}: JSX.IntrinsicElements['div'] & {
	name?: string
}) => {
	return <div className={`${styles.root} ${className}`} {...props}>
		{name ? <h1>
			{name}
		</h1> : null}

		{children}
	</div>
}