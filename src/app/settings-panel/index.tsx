import Label from './label'
import Panel from '../panel'
import { views } from '../utils'

export default function SettingsPanel({ setView, setIsShowingSeparators, setDecimalPlaces }: { setView: React.Dispatch<React.SetStateAction<number>>, setIsShowingSeparators: React.Dispatch<React.SetStateAction<boolean>>, setDecimalPlaces: React.Dispatch<React.SetStateAction<number>> }) {
	return <Panel name='Settings'>
		{views.map(({ name }, id) => {
			return <div key={id}>
				<input type='radio' id={name} value={id} name='view' defaultChecked={id == 0} onChange={({ target: { value } }) => {
					setView(
						parseInt(value)
					)
				}}/>

				<Label htmlFor={name} text={name} />
			</div>
		})}

		<hr />

		<div>
			<input type='checkbox' id='separators' onChange={({ target: { checked } }) => {
				setIsShowingSeparators(checked)
			}} />

			<Label htmlFor='separators' text='Show Thousands Separators' />
		</div>

		<hr />

		<div>
			<Label htmlFor='decimalPlaces' text='Decimal Places' />

			<input type='number' min={0} max={15} defaultValue={15} id='decimalPlaces' onChange={({ target: { value } }) => {
				setDecimalPlaces(
					parseInt(value)
				)
			}} />
		</div>
	</Panel>
}