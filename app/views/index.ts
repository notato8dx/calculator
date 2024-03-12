import BasicButtons from '../calculator/basic-buttons'
import ProgrammerButtons from '../calculator/programmer-buttons'
import ScientificButtons from '../calculator/scientific-buttons'
import { CalculatorButtonListProps } from '../utils'

class View {
	readonly name
	readonly columnCount
	readonly Buttons

	constructor(name: string, columnCount: number, Buttons: React.FunctionComponent<CalculatorButtonListProps>) {
		this.name = name
		this.columnCount = columnCount
		this.Buttons = Buttons
	}
}

export default [
	new View('Basic', 4, BasicButtons),
	new View('Scientific', 10, ScientificButtons),
	new View('Programmer', 7, ProgrammerButtons)
]