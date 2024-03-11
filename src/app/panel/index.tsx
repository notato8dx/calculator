import { ReactNode } from 'react'
import './styles.css'

export default function Panel({ id, name, children }: { name: string, children: ReactNode } ) {
	return <div id={id} className='panel'>
		<h1>
			{name}
		</h1>

		{children}
	</div>
}