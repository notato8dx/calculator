import { useId } from 'react'
import { Input } from '..'

export default function <Radio extends { label: string }>({ radios, handleChange }: {
	radios: readonly Radio[],
	handleChange: (radio: Radio) => void
}) {
	const name = useId()

	return radios.map((radio, id) => {
		return <Input
			key={id}
			label={radio.label}
			type='radio'
			name={name}
			defaultChecked={id == 0}
			onChange={() => {
				handleChange(radio)
			}}
		/>
	})
}