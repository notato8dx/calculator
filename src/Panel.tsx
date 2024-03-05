export default function Panel({ name, children }) {
	return <div className='panel'>
		<h1>
			{name}
		</h1>

		{children}
	</div>
}