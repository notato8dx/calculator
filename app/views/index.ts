import BasicButtons from './basic-buttons'
import ProgrammerButtons from './programmer-buttons'
import ScientificButtons from './scientific-buttons'

export default [
	{
		name: 'Basic',
		columnCount: 4,
		Buttons: BasicButtons
	},
	{
		name: 'Scientific',
		columnCount: 10,
		Buttons: ScientificButtons
	},
	{
		name: 'Programmer',
		columnCount: 7,
		Buttons: ProgrammerButtons
	}
]