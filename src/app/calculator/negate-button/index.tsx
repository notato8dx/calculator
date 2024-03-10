import ValueButton from '../value-button'

export default function NegateButton({ currentValue, setCurrentValue }) {
	return <ValueButton symbol={'⁺⁄₋'} getNewValue={value => -value} setCurrentValue={setCurrentValue} currentValue={currentValue} />
}