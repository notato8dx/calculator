import ValueButton from '../value-button'

export default function NegateButton(props: { setOperand: (value: number, id?: number) => void, operandId: number, operands: number[] }) {
	return <ValueButton {...props} symbol={'⁺⁄₋'} getNewValue={value => -value}  />
}