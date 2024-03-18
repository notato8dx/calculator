import ButtonList from './button-list'

export default interface View {
	readonly name: string
	readonly columnCount: number
	readonly Buttons: ButtonList
}