import { JSX } from 'react'

export default function LabeledInput({ children, id, ...props }: JSX.IntrinsicElements['input']) {
	return <div>
		<input {...props} id={id} />

		<label htmlFor={id}>
			{children}
		</label>
	</div>
}