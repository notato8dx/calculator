import ButtonListProps from './button-list-props'

export default interface View {
	readonly name: string
	readonly columnCount: number
	readonly Buttons: React.FunctionComponent<ButtonListProps>
}