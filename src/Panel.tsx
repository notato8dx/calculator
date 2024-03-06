import { ReactNode } from 'react'

export default function Panel({ name, children }: { name: string, children: ReactNode } ) {
	return <div className='panel'>
		<h1>
			{name}
		</h1>

		{children}
	</div>
}