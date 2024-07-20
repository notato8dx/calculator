import { useState } from 'react'
import { Button } from '..'
import { Operation } from '../../types'
import { operations } from '../../data'

export default ({
    operationComplete,
    handleOperation,
    handleNumber,
    handleClear,
    handleClearAll,
    handleValue,
    handleEqual,
    handleDecimal
}: {
    readonly operationComplete: boolean,
    readonly handleOperation: () => void,
    readonly handleNumber: (number: number) => void,
    readonly handleClear: () => void,
    readonly handleClearAll: () => void,
    readonly handleValue: (getNewValue: (value: number) => number) => void,
    readonly handleEqual: (operation: Operation) => void,
    readonly handleDecimal: () => void
}) => {
    const [operation, setOperation] = useState(operations[0])
    const [shouldClearAll, setShouldClearAll] = useState(true)

    const [addButton, subtractButton, multiplyButton, divideButton] = operations.map(o => {
        return <Button
            variant='operation'
            isSelected={!operationComplete && o == operation}
            onClick={() => {
                setOperation(o)
                handleOperation()
            }}
        >
            {o.symbol}
        </Button>
    })

    const numberButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, id) => {
        return <Button isLarge={id == 0} isBottomLeft={id == 0} variant='number' onClick={() => {
            handleNumber(number)
            setShouldClearAll(false)
        }}>
            {number.toString(16).toUpperCase()}
        </Button>
    })

    return <>
        {shouldClearAll ?
            <Button variant='value' onClick={handleClearAll}>
                AC
            </Button>
            :
            <Button variant='value' onClick={() => {
                handleClear()
                setShouldClearAll(true)
            }}>
                C
            </Button>
        }

        <Button variant='value' onClick={() => handleValue(value => -value)}>
            ⁺⁄₋
        </Button>

        <Button variant='value' onClick={() => handleValue(value => value / 100)}>
            %
        </Button>

        {divideButton}
        {numberButtons[7]}
        {numberButtons[8]}
        {numberButtons[9]}
        {multiplyButton}
        {numberButtons[4]}
        {numberButtons[5]}
        {numberButtons[6]}
        {subtractButton}
        {numberButtons[1]}
        {numberButtons[2]}
        {numberButtons[3]}
        {addButton}
        {numberButtons[0]}

        <Button variant='number' onClick={() => {
            handleDecimal()
            setShouldClearAll(false)
        }}>
            .
        </Button>

        <Button variant='operation' onClick={() => handleEqual(operation)}>
            =
        </Button>
    </>
}