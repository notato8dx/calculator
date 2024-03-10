import ValueButton from '../value-button'

export default function PercentButton({ currentValue, setCurrentValue }) {
	return <ValueButton symbol={'%'} getNewValue={value => value / 100} setCurrentValue={setCurrentValue} currentValue={currentValue} />
}