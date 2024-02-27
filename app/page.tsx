'use client'

import { Box, Button, ChakraProvider, Checkbox, Divider, Grid, GridItem, Menu, MenuButton, MenuDivider, MenuItemOption, MenuList, MenuOptionGroup, Popover, PopoverBody, PopoverContent, PopoverTrigger, Radio, RadioGroup, Stack, Text, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'

enum Operation { Add, Subtract, Multiply, Divide }

const operands = (() => {
	function createOperand() {
		return { value: 0 }
	}

	return [createOperand(), createOperand()]
})()

let operation = Operation.Add
let current = 0

function setCurrent(operand) {
	current = operand
	operands[operand].canOverwrite = true
}

export default function() {
	const [display, setDisplay] = useState(0)
	const [shouldClearAll, setShouldClearAll] = useState(true)
	const [isShowingSeparators, setIsShowingSeparators] = useState(false)
	const [isRPNMode, setIsRPNMode] = useState(false)
	const [isShowingPaperTape, setIsShowingPaperTape] = useState(false)
	const [decimalPlaces, setDecimalPlaces] = useState('15')
	const [view, setView] = useState('0')

	const views = (() => {
		function createView(columnCount, component) {
			return { columnCount, component }
		}

		const basicRows = [
			<>
				<GridButton onClick={() => {
					if (shouldClearAll) {
						operands[1].value = 0
						operation = Operation.Add
						resetDisplay(0)
					} else {
						setCurrentValue(0)
						setShouldClearAll(true)
					}
				}} symbol={shouldClearAll ? 'AC' : 'C'} tooltip={`Clear${shouldClearAll ? ' All' : ''}`} />
				<ValueGridButton value={-operands[current].value} symbol='±' tooltip='Negate the displayed value' />
				<ValueGridButton value={operands[current].value / 100} symbol='%' />
				<OperationGridButton operation={Operation.Divide} symbol='÷' />
			</>,
			<>
				<NumberGridButton number={7} />
				<NumberGridButton number={8} />
				<NumberGridButton number={9} />
				<OperationGridButton operation={Operation.Multiply} symbol='×' />
			</>,
			<>
				<NumberGridButton number={4} />
				<NumberGridButton number={5} />
				<NumberGridButton number={6} />
				<OperationGridButton operation={Operation.Add} symbol='+' />
			</>,
			<>
				<NumberGridButton number={1} />
				<NumberGridButton number={2} />
				<NumberGridButton number={3} />
				<OperationGridButton operation={Operation.Subtract} symbol='−' />
			</>,
			<>
				<NumberGridButton number={0} colSpan={2} />
				<GridButton symbol='.' />
				<GridButton onClick={() => resetDisplay((() => {
					switch (operation) {
					case Operation.Add: return operands[0].value + operands[1].value
					case Operation.Subtract: return operands[0].value - operands[1].value
					case Operation.Multiply: return operands[0].value * operands[1].value
					case Operation.Divide: return operands[0].value / operands[1].value
					}
				})())} symbol='=' />
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

	function setCurrentValue(value) {
		operands[current].value = value
		setDisplay(value)
	}

	function resetDisplay(value) {
		setCurrent(0)
		setCurrentValue(value)
	}

	function GridButton({ children, colSpan, tooltip, onClick, symbol }) {
		return (
			<GridItem colSpan={colSpan}>
				<Tooltip label={tooltip} openDelay={1000}>
					<Button style={{ width: '100%' }} onClick={onClick}>{symbol}</Button>
				</Tooltip>
			</GridItem>
		)
	}

	function NumberGridButton({ colSpan, number }) {
		return (
			<GridButton onClick={() => {
				if (operands[current].canOverwrite) {
					operands[current].value = 0
					operands[current].canOverwrite = false
				}

				setCurrentValue(operands[current].value * 10 + number)
				setShouldClearAll(false)
			}} symbol={number} colSpan={colSpan} />
		)
	}

	function OperationGridButton({ operation: newOperation, symbol }) {
		return (
			<GridButton onClick={() => {
				operation = newOperation
				setCurrent(1)
			}} symbol={symbol} />
		)
	}

	function ValueGridButton({ value, symbol, tooltip }) {
		return (
			<GridButton onClick={() => setCurrentValue(value)} symbol={symbol} tooltip={tooltip} />
		)
	}

	return (
		<ChakraProvider>
			<Popover>
				<PopoverTrigger>
					<Button>View</Button>
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
							<Checkbox isChecked={isShowingSeparators} onChange={({ target: { checked } }) => setIsShowingSeparators(checked)}>Show Thousands Separators</Checkbox>
							<Divider />
							<Checkbox isChecked={isRPNMode} onChange={({ target: { checked } }) => setIsRPNMode(checked)}>RPN Mode</Checkbox>
							<Divider />
							<Checkbox isChecked={isShowingPaperTape} onChange={({ target: { checked } }) => setIsShowingPaperTape(checked)}>Paper Tape</Checkbox>
						</Stack>
					</PopoverBody>
				</PopoverContent>
			</Popover>

			<Box style={{ width: 'max-content', margin: 'auto' }}>
				<Text style={{ fontSize: '200%', textAlign: 'right' }}>{isShowingSeparators ? display.toLocaleString() : display}</Text>

				<Grid templateColumns={`repeat(${views[view].columnCount}, 1fr)`} style={{ width: '100%' }}>
					{views[view].component}
				</Grid>
			</Box>
		</ChakraProvider>
	)
}
