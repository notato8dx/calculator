'use client'

import { Button, ChakraProvider, Grid, GridItem, Text } from '@chakra-ui/react'
import { useState } from 'react'

class Operand {
	static #currentOperand;

	static get current() {
		return this.currentOperand
	}

	static set current(operand) {
		this.currentOperand = operand
		operand.canOverwrite = true
	}

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
Operand.current = operands[0]

function GridButton({ colSpan, onClick, symbol }) {
	return (
		<GridItem colSpan={colSpan}>
			<Button style={{ width: '100%' }} onClick={onClick}>{symbol}</Button>
		</GridItem>
	)
}

function NumberGridButton({ colSpan, number, setCurrentValue, setShouldClearAll }) {
	return (
		<GridButton onClick={() => {
			if (Operand.current.canOverwrite) {
				Operand.current.reset()
			}

			setCurrentValue(Operand.current.value * 10 + number)
			setShouldClearAll(false)
		}} symbol={number} colSpan={colSpan} />
	)
}

function OperationGridButton({ operation: newOperation, symbol }) {
	return (
		<GridButton onClick={() => {
			operation = newOperation
			Operand.current = operands[1]
		}} symbol={symbol} />
	)
}

function ValueGridButton({ value, symbol, setCurrentValue }) {
	return (
		<GridButton onClick={() => setCurrentValue(value)} symbol={symbol} />
	)
}

export default function() {
	const [display, setDisplay] = useState('0')
	const [shouldClearAll, setShouldClearAll] = useState(true)

	function setCurrentValue(value) {
		Operand.current.value = value
		setDisplay(Operand.current.value)
	}

	function resetDisplay(value) {
		Operand.current = operands[0]
		setCurrentValue(value)
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

				<ValueGridButton value={-Operand.current.value} symbol='±' setCurrentValue={setCurrentValue} />
				<ValueGridButton value={Operand.current.value / 100} symbol='%' setCurrentValue={setCurrentValue} />
				<OperationGridButton operation={Operation.Divide} symbol='÷' />
				<NumberGridButton number={7} setCurrentValue={setCurrentValue} setShouldClearAll={setShouldClearAll} />
				<NumberGridButton number={8} setCurrentValue={setCurrentValue} setShouldClearAll={setShouldClearAll} />
				<NumberGridButton number={9} setCurrentValue={setCurrentValue} setShouldClearAll={setShouldClearAll} />
				<OperationGridButton operation={Operation.Multiply} symbol='×' />
				<NumberGridButton number={4} setCurrentValue={setCurrentValue} setShouldClearAll={setShouldClearAll} />
				<NumberGridButton number={5} setCurrentValue={setCurrentValue} setShouldClearAll={setShouldClearAll} />
				<NumberGridButton number={6} setCurrentValue={setCurrentValue} setShouldClearAll={setShouldClearAll} />
				<OperationGridButton operation={Operation.Add} symbol='+' />
				<NumberGridButton number={1} setCurrentValue={setCurrentValue} setShouldClearAll={setShouldClearAll} />
				<NumberGridButton number={2} setCurrentValue={setCurrentValue} setShouldClearAll={setShouldClearAll} />
				<NumberGridButton number={3} setCurrentValue={setCurrentValue} setShouldClearAll={setShouldClearAll} />
				<OperationGridButton operation={Operation.Subtract} symbol='−' />
				<NumberGridButton number={0} colSpan={2} setCurrentValue={setCurrentValue} setShouldClearAll={setShouldClearAll} />
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
