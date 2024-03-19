import { JSX } from 'react'
import style from './style.module.css'

export default ({
	children,
	name,
	...props
}: JSX.IntrinsicElements['div'] & {
	name: string
}) => {
	return <div {...props} className={style.root}>
		<h1>
			{name}
		</h1>

		{children}
	</div>
}