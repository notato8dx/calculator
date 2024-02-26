'use client'

import { Button, ChakraProvider, Grid, GridItem, Text } from '@chakra-ui/react'
import { useState } from 'react'

class Operand {
	constructor() {
		this.reset()
	}

	reset() {
		this.value = 0
		this.canOverwrite = false
	}
}

enum Operation { Add, Subtract, Multiply, Divide }

let operands = [new Operand(), new Operand()]
let operation = Operation.Add
let current = operands[0]

function setCurrent(operand) {
	current = operands[operand]
	current.canOverwrite = true
}

export default function() {
	const [display, setDisplay] = useState('0')
	const [shouldClearAll, setShouldClearAll] = useState(true)

	function setCurrentValue(value) {
		current.value = value
		setDisplay(current.value)
	}

	function resetDisplay(value) {
		setCurrent(0)
		setCurrentValue(value)
	}

	function GridButton({ children, colSpan, onClick, symbol }) {
		return (
			<GridItem colSpan={colSpan}>
				<Button style={{ width: '100%' }} onClick={onClick}>{symbol}</Button>
			</GridItem>
		)
	}

	function NumberGridButton({ colSpan, number }) {
		return (
			<GridButton onClick={() => {
				if (current.canOverwrite) {
					current.reset()
				}

				setCurrentValue(current.value * 10 + number)
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

	function ValueGridButton({ value, symbol }) {
		return (
			<GridButton onClick={() => setCurrentValue(value)} symbol={symbol} />
		)
	}

	return (
		<ChakraProvider>
			<Text style={{ fontSize: '200%', textAlign: 'right' }}>{display}</Text>

			<Grid templateColumns='repeat(4, 1fr)'>
				<GridButton onClick={() => {
					if (shouldClearAll) {
						operands[1].reset()
						operation = Operation.Add
						resetDisplay(0)
					} else {
						setCurrentValue(0)
						setShouldClearAll(true)
					}
				}} symbol={shouldClearAll ? 'AC' : 'C'} />

				<ValueGridButton value={-current.value} symbol='±' />
				<ValueGridButton value={current.value / 100} symbol='%' />
				<OperationGridButton operation={Operation.Divide} symbol='÷' />
				<NumberGridButton number={7} />
				<NumberGridButton number={8} />
				<NumberGridButton number={9} />
				<OperationGridButton operation={Operation.Multiply} symbol='×' />
				<NumberGridButton number={4} />
				<NumberGridButton number={5} />
				<NumberGridButton number={6} />
				<OperationGridButton operation={Operation.Add} symbol='+' />
				<NumberGridButton number={1} />
				<NumberGridButton number={2} />
				<NumberGridButton number={3} />
				<OperationGridButton operation={Operation.Subtract} symbol='−' />
				<NumberGridButton number={0} colSpan={2} />
				<GridButton symbol='.' />

				<GridButton onClick={() => resetDisplay((() => {
					switch (operation) {
					case Operation.Add: return operands[0].value + operands[1].value
					case Operation.Subtract: return operands[0].value - operands[1].value
					case Operation.Multiply: return operands[0].value * operands[1].value
					case Operation.Divide: return operands[0].value / operands[1].value
					} }
				)())} symbol='=' />
			</Grid>
		</ChakraProvider>
	)
}
