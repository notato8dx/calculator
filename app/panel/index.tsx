import { ReactNode } from 'react'
import css from './index.module.css'

export default function Panel({ name, children }: { name: string, children: ReactNode } ) {
	return <div id={css.root}>
		<h1>
			{name}
		</h1>

		{children}
	</div>
}