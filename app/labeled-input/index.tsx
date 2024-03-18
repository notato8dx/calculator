import { JSX, useId } from 'react'

export default ({ children, ...props }: JSX.IntrinsicElements['input']) => {
	const id = useId()

	return <div>
		<input {...props} id={id} />

		<label htmlFor={id}>
			{children}
		</label>
	</div>
}