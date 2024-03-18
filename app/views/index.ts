import BasicButtons from './basic-buttons'
import ProgrammerButtons from './programmer-buttons'
import ScientificButtons from './scientific-buttons'
import ButtonListProps from '../button-list-props'
import IView from '../view'

class View implements IView {
	readonly name
	readonly columnCount
	readonly Buttons

	constructor(
		name: string,
		columnCount: number,
		Buttons: React.FunctionComponent<ButtonListProps>
	) {
		this.name = name
		this.columnCount = columnCount
		this.Buttons = Buttons
	}
}

export const basic = new View('Basic', 4, BasicButtons)
export const scientific = new View('Scientific', 10, ScientificButtons)
export const programmer = new View('Programmer', 7, ProgrammerButtons)