import BasicButtons from './basic-buttons'
import ProgrammerButtons from './programmer-buttons'
import ScientificButtons from './scientific-buttons'
import ButtonList from '../button-list'
import View from '../view'

function createView(
	name: string,
	columnCount: number,
	Buttons: ButtonList
): View {
	return { name, columnCount, Buttons }
}

export const basic = createView('Basic', 4, BasicButtons)
export const scientific = createView('Scientific', 10, ScientificButtons)
export const programmer = createView('Programmer', 7, ProgrammerButtons)