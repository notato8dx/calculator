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
		<div style={{borderBottom: '1px solid black'}}>
			<h1>
				{name}
			</h1>
		</div>

		<div style={{ margin: '12px 0 ', padding: '0 12px' }}>
			{children}
		</div>

		<div style={{ minHeight: '24px', borderTop: '1px solid black' }}>
		
		</div>
	</div>
}