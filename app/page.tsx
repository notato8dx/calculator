'use client'

import { Box, Button, ChakraProvider, Checkbox, Divider, Grid, GridItem, Heading, Menu, MenuButton, MenuDivider, MenuItemOption, MenuList, MenuOptionGroup, Popover, PopoverBody, PopoverContent, PopoverTrigger, Radio, RadioGroup, Stack, Text, Tooltip } from '@chakra-ui/react'
import { Fragment, useState } from 'react'

// the only raw 'number' that should be stored in memory is the initial number
// when an operation is selected, a new calculation is added to the stack
// this calculation has a value, and a function that returns a value based on a parameter and its value
// additionally, when an operation is selected, there should be a precendence (order of operations)
// depending on precedence, the stack should be executed and cleared

const operands = (() => {
	function createOperand() {
		return { value: 0 }
	}

	return [createOperand(), createOperand()]
})()

const operations = (() => {
	function createOperation(symbol, func) {
		return { function: func, symbol }
	}

	return [
		createOperation('+', () => operands[0].value + operands[1].value),
		createOperation('-', () => operands[0].value - operands[1].value),
		createOperation('*', () => operands[0].value * operands[1].value),
		createOperation('/', () => operands[0].value / operands[1].value),
	]
})()

let operand = 0
let operation = 0
let paperTapeKey = 0

function setOperand(newOperand) {
	operand = newOperand
	operands[operand].canOverwrite = true
}

function setOperandValue(value, setDisplay) {
	operands[operand].value = value
	setDisplay(value)
}

function GridButton({ children, colSpan, tooltip, onClick, symbol }) {
	return <GridItem colSpan={colSpan}>
		<Tooltip label={tooltip} openDelay={1000}>
			<Button style={{ width: '100%' }} onClick={onClick}>
				{symbol}
			</Button>
		</Tooltip>
	</GridItem>
}

function NumberGridButton({ colSpan, number, setDisplay, setShouldClearAll }) {
	return <GridButton symbol={number} colSpan={colSpan} onClick={() => {
		if (operands[operand].canOverwrite) {
			operands[operand].value = 0
			operands[operand].canOverwrite = false
		}

		setOperandValue(operands[operand].value * 10 + number, setDisplay)
		setShouldClearAll(false)
	}} />
}

function OperationGridButton({ operation: newOperation, symbol, setDisplay }) {
	return <GridButton symbol={symbol} onClick={() => {
		operation = newOperation
		setOperand(1)
		setOperandValue(operands[0].value, setDisplay)
	}} />
}

function ValueGridButton({ value, symbol, tooltip, setDisplay }) {
	return <GridButton symbol={symbol} tooltip={tooltip} onClick={() => setOperandValue(value, setDisplay)} />
}

export default function() {
	const [display, setDisplay] = useState(0)
	const [shouldClearAll, setShouldClearAll] = useState(true)
	const [isShowingSeparators, setIsShowingSeparators] = useState(false)
	const [isRPNMode, setIsRPNMode] = useState(false)
	const [isShowingPaperTape, setIsShowingPaperTape] = useState(false)
	const [decimalPlaces, setDecimalPlaces] = useState('15')
	const [view, setView] = useState('0')
	const [paperTapeHistory, setPaperTapeHistory] = useState([])

	const views = (() => {
		function createView(columnCount, component) {
			return { columnCount, component }
		}

		const basicRows = [
			<>
				<GridButton onClick={() => {
					if (shouldClearAll) {
						operands[1].value = 0
						operation = 0
						resetDisplay(0)
					} else {
						setOperandValue(0, setDisplay)
						setShouldClearAll(true)
					}
				}} symbol={shouldClearAll ? 'AC' : 'C'} tooltip={`Clear${shouldClearAll ? ' All' : ''}`} />
				<ValueGridButton value={-operands[operand].value} symbol='±' tooltip='Negate the displayed value' setDisplay={setDisplay} />
				<ValueGridButton value={operands[operand].value / 100} symbol='%' setDisplay={setDisplay} />
				<OperationGridButton operation={3} symbol='÷' setDisplay={setDisplay} />
			</>,
			<>
				<NumberGridButton number={7} setDisplay={setDisplay} setShouldClearAll={setShouldClearAll} />
				<NumberGridButton number={8} setDisplay={setDisplay} setShouldClearAll={setShouldClearAll} />
				<NumberGridButton number={9} setDisplay={setDisplay} setShouldClearAll={setShouldClearAll} />
				<OperationGridButton operation={2} symbol='×' setDisplay={setDisplay} />
			</>,
			<>
				<NumberGridButton number={4} setDisplay={setDisplay} setShouldClearAll={setShouldClearAll} />
				<NumberGridButton number={5} setDisplay={setDisplay} setShouldClearAll={setShouldClearAll} />
				<NumberGridButton number={6} setDisplay={setDisplay} setShouldClearAll={setShouldClearAll} />
				<OperationGridButton operation={1} symbol='−' setDisplay={setDisplay} />
			</>,
			<>
				<NumberGridButton number={1} setDisplay={setDisplay} setShouldClearAll={setShouldClearAll} />
				<NumberGridButton number={2} setDisplay={setDisplay} setShouldClearAll={setShouldClearAll} />
				<NumberGridButton number={3} setDisplay={setDisplay} setShouldClearAll={setShouldClearAll} />
				<OperationGridButton operation={0} symbol='+' setDisplay={setDisplay} />
			</>,
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
	
		return [
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
	})()

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
									<Radio value='0'>Basic</Radio>
									<Radio value='1'>Scientific</Radio>
									<Radio value='2'>Programmer</Radio>
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

				<Grid templateColumns={`repeat(${views[view].columnCount}, 72px)`}>
					{views[view].component}
				</Grid>
			</Box>

			{isShowingPaperTape ? <>
				<Heading>
					Paper Tape
				</Heading>

				<Box style={{ overflowY: 'scroll', maxHeight: '200px' }}>
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

				<Button onClick={() => setPaperTapeHistory([])}>
					Clear
				</Button>
			</> : null}
		</ChakraProvider>
	)
}
