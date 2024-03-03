'use client'

import { Box, Button, ChakraProvider, Checkbox, Divider, Grid, GridItem, Heading, Menu, MenuButton, MenuDivider, MenuItemOption, MenuList, MenuOptionGroup, Popover, PopoverBody, PopoverContent, PopoverTrigger, Radio, RadioGroup, Stack, Text, Tooltip } from '@chakra-ui/react'
import { Fragment, useState } from 'react'
import GridButton from './GridButton'
import NumberGridButton from './GridButton/NumberGridButton'
import OperationGridButton from './GridButton/OperationGridButton'
import ValueGridButton from './GridButton/ValueGridButton'
import { operand, operands, operation, operations, setOperand, setOperandValue, setOperation } from './state'

let paperTapeKey = 0

export default function Calculator() {
	const [display, setDisplay] = useState(0)
	const [shouldClearAll, setShouldClearAll] = useState(true)
	const [isShowingSeparators, setIsShowingSeparators] = useState(false)
	const [isRPNMode, setIsRPNMode] = useState(false)
	const [isShowingPaperTape, setIsShowingPaperTape] = useState(false)
	const [decimalPlaces, setDecimalPlaces] = useState('15')
	const [view, setView] = useState('0')
	const [paperTapeHistory, setPaperTapeHistory] = useState([])

	function createNumberRow(numbers) {
		return numbers.map((number, i) => {
			return <NumberGridButton number={number} setDisplay={setDisplay} setShouldClearAll={setShouldClearAll} key={i} />
		})
	}

	function createBasicRow(numbers, operation, operationSymbol) {
		return <>
			{createNumberRow(numbers)}
			<OperationGridButton operation={operation} symbol={operationSymbol} setDisplay={setDisplay} />
		</>
	}

	function createView(columnCount, component) {
		return { columnCount, component }
	}

	const basicRows = [
		<>
			<GridButton onClick={() => {
				if (shouldClearAll) {
					operands[1].value = 0
					setOperation(0)
					resetDisplay(0)
				} else {
					operands[operand].value = 0

					if (operands[operand].canOverwrite) {
						setOperand(0)
					}
					
					setDisplay(operands[operand].value)
					setShouldClearAll(true)
				}
			}} symbol={`${shouldClearAll ? 'A' : ''}C`} tooltip={`Clear${shouldClearAll ? ' All' : ''}`} />
			<ValueGridButton value={-operands[operand].value} symbol='±' tooltip='Negate the displayed value' setDisplay={setDisplay} />
			<ValueGridButton value={operands[operand].value / 100} symbol='%' setDisplay={setDisplay} />
			<OperationGridButton operation={3} symbol='÷' setDisplay={setDisplay} />
		</>,
		createBasicRow([7, 8, 9], 2, '×'),
		createBasicRow([4, 5, 6], 1, '−'),
		createBasicRow([1, 2, 3], 0, '+'),
		<>
			<NumberGridButton number={0} colSpan={2} setDisplay={setDisplay} setShouldClearAll={setShouldClearAll} />
			<GridButton symbol='.' />
			<GridButton onClick={() => {
				const value = operations[operation].function()

				setPaperTapeHistory([...paperTapeHistory, {
					operands: [...operands.map(operand => operand.value)],
					operation,
					value,
					key: paperTapeKey
				}])

				paperTapeKey += 1

				resetDisplay(value)
			}} symbol='=' />
		</>
	]

	const views = [
		createView(4, <>
			{basicRows[0]}
			{basicRows[1]}
			{basicRows[2]}
			{basicRows[3]}
			{basicRows[4]}
		</>),
		createView(10, <>
			<GridButton symbol='(' />
			<GridButton symbol=')' />
			<GridButton symbol='mc' />
			<GridButton symbol='m+' />
			<GridButton symbol='m−' />
			<GridButton symbol='mr' />
			{basicRows[0]}
			<GridButton symbol={<>2<sup>nd</sup></>} />
			<GridButton symbol={<>x<sup>2</sup></>} />
			<GridButton symbol={<>x<sup>3</sup></>} />
			<GridButton symbol={<>x<sup>y</sup></>} />
			<GridButton symbol={<>e<sup>x</sup></>} />
			<GridButton symbol={<>10<sup>x</sup></>} />
			{basicRows[1]}
			<GridButton symbol={<><sup>1</sup>⁄<sub>x</sub></>} />
			<GridButton symbol={<><sup>2</sup>√x</>} />
			<GridButton symbol={<><sup>3</sup>√x</>} />
			<GridButton symbol={<><sup>y</sup>√x</>} />
			<GridButton symbol='ln' />
			<GridButton symbol={<>log<sub>10</sub></>} />
			{basicRows[2]}
			<GridButton symbol='x!' />
			<GridButton symbol='sin' />
			<GridButton symbol='cos' />
			<GridButton symbol='tan' />
			<GridButton symbol='e' />
			<GridButton symbol='EE' />
			{basicRows[3]}
			<GridButton symbol='Rad' />
			<GridButton symbol='sinh' />
			<GridButton symbol='cosh' />
			<GridButton symbol='tanh' />
			<GridButton symbol='π' />
			<GridButton symbol='Rand' />
			{basicRows[4]}
		</>),
		createView(7, null)
	]

	function resetDisplay(value) {
		setOperand(0)
		setOperandValue(value, setDisplay)
	}

	return (
		<ChakraProvider>
			<Popover>
				<PopoverTrigger>
					<Button>
						View
					</Button>
				</PopoverTrigger>

				<PopoverContent>
					<PopoverBody>
						<Stack>
							<RadioGroup onChange={setView} value={view}>
								<Stack>
									{['Basic', 'Scientific', 'Programmer'].map((view, i) => {
										return <Radio value={i.toString()} key={i}>{view}</Radio>
									})}
								</Stack>
							</RadioGroup>

							<Divider />

							<Checkbox isChecked={isShowingSeparators} onChange={({ target: { checked } }) => setIsShowingSeparators(checked)}>
								Show Thousands Separators
							</Checkbox>

							<Divider />

							<Checkbox isChecked={isRPNMode} onChange={({ target: { checked } }) => setIsRPNMode(checked)}>
								RPN Mode
							</Checkbox>

							<Divider />

							<Checkbox isChecked={isShowingPaperTape} onChange={({ target: { checked } }) => setIsShowingPaperTape(checked)}>
								Paper Tape
							</Checkbox>
						</Stack>
					</PopoverBody>
				</PopoverContent>
			</Popover>

			<Box style={{ margin: 'auto', maxWidth: 'min-content' }}>
				<Text style={{ textAlign: 'right' }}>
					{isShowingSeparators ? display.toLocaleString() : display}
				</Text>

				<Grid templateColumns={`repeat(${views[view].columnCount}, 72px)`} style={{ gap: '2px' }}>
					{views[view].component}
				</Grid>
			</Box>

			{isShowingPaperTape ? <>
				<Heading>
					Paper Tape
				</Heading>

				<Box style={{ overflowY: 'scroll', height: '200px' }}>
					{paperTapeHistory.map(entry => <Fragment key={entry.key}>
						<Text>
							{`${entry.operands[0]} ${operations[entry.operation].symbol} ${entry.operands[1]}`}
						</Text>

						<Text>
							{`= ${entry.value}`}
						</Text>

						<br />
					</Fragment>)}
				</Box>

				<Button style={{ float: 'right' }} onClick={() => setPaperTapeHistory([])}>
					Clear
				</Button>
			</> : null}
		</ChakraProvider>
	)
}
