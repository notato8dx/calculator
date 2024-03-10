import SettingLabel from './setting-label'
import Panel from '../panel'
import { views } from '../utils'
import './styles.css'

export default function SettingsPanel({ setView, setIsShowingSeparators, setDecimalPlaces }: { setView: React.Dispatch<React.SetStateAction<number>>, setIsShowingSeparators: React.Dispatch<React.SetStateAction<boolean>>, setDecimalPlaces: React.Dispatch<React.SetStateAction<number>> }) {
	return <Panel name='Settings'>
		{views.map(({ name }, id) => {
			return <div key={id}>
				<input className='setting-input' type='radio' id={name} value={id} name='view' defaultChecked={id == 0} onChange={({ target: { value } }) => {
					setView(
						parseInt(value)
					)
				}}/>

				<SettingLabel htmlFor={name} text={name} />
			</div>
		})}

		<hr />

		<div>
			<input className='setting-input' type='checkbox' id='separators' onChange={({ target: { checked } }) => {
				setIsShowingSeparators(checked)
			}} />

			<SettingLabel htmlFor='separators' text='Show Thousands Separators' />
		</div>

		<hr />

		<div>
			<SettingLabel htmlFor='decimalPlaces' text='Decimal Places' />

			<input className='setting-input' type='number' min={0} max={15} defaultValue={15} id='decimalPlaces' onChange={({ target: { value } }) => {
				setDecimalPlaces(
					parseInt(value)
				)
			}} />
		</div>
	</Panel>
}