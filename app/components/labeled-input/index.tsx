import { JSX, useId } from 'react'
import style from './style.module.css'

export default ({
	children,
	...props
}: JSX.IntrinsicElements['input']) => {
	const id = useId()

	return <div className={style.root}>
		<input {...props} id={id} />

		<label htmlFor={id}>
			{children}
		</label>
	</div>
}