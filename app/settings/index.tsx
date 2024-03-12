import Panel from '../panel'
import views from '../views'

export default function Settings({ setViewId, setIsShowingSeparators, setDecimalPlaceCount }: { setViewId: React.Dispatch<React.SetStateAction<number>>, setIsShowingSeparators: React.Dispatch<React.SetStateAction<boolean>>, setDecimalPlaceCount: React.Dispatch<React.SetStateAction<number>> }) {
	return <Panel name='Settings'>
		{views.map(({ name }, id) => {
			return <div key={id}>
				<input type='radio' id={name} value={id} name='view' defaultChecked={id == 0} onChange={({ target: { value } }) => {
					setViewId(
						parseInt(value)
					)
				}}/>

				<label htmlFor={name}>
					{name}
				</label>
			</div>
		})}

		<hr />

		<div>
			<input type='checkbox' id='separators' onChange={({ target: { checked } }) => {
				setIsShowingSeparators(checked)
			}} />

			<label htmlFor='separators'>
				Show Thousands Separators
			</label>
		</div>

		<hr />

		<div>
			<label htmlFor='decimalPlaces'>
				Decimal Places
			</label>

			<input type='number' min={0} max={15} defaultValue={15} id='decimalPlaces' onChange={({ target: { value } }) => {
				setDecimalPlaceCount(
					parseInt(value)
				)
			}} />
		</div>
	</Panel>
}