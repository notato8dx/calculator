import { Operation } from '../types'

export default [
	{
		symbol: '+',
		symbolASCII: '+',
		operate: operands => operands[0] + operands[1]
	},
	{
		symbol: '−',
		symbolASCII: '-',
		operate: operands => operands[0] - operands[1]
	},
	{
		symbol: '×',
		symbolASCII: '*', 
		operate: operands => operands[0] * operands[1]
	},
	{
		symbol: '÷',
		symbolASCII: '/',
		operate: operands => operands[0] / operands[1]
	}
] as readonly [Operation, Operation, Operation, Operation]