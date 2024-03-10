import './styles.css'

export default function SettingLabel({ htmlFor, text }: { htmlFor: string, text: string }) {
	return <label className='setting-label' htmlFor={htmlFor}>
		{text}
	</label>
}