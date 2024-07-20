import 'package:flutter/material.dart';
import 'operation.dart';

var operations = [
  Operation('+', '+', (operand1, operand2) => operand1 + operand2),
  Operation('−', '-', (operand1, operand2) => operand1 - operand2),
  Operation('×', '*', (operand1, operand2) => operand1 * operand2),
  Operation('÷', '/', (operand1, operand2) => operand1 / operand2),
];

class ButtonList extends StatefulWidget {
  final bool operationComplete;
  final void Function() handleOperation;
  final void Function(double) handleNumber;
  final void Function() handleClear;
  final void Function() handleClearAll;
  final void Function(double Function(double)) handleValue;
  final void Function(Operation) handleEqual;

  const ButtonList(
      this.operationComplete,
      this.handleOperation,
      this.handleNumber,
      this.handleClear,
      this.handleClearAll,
      this.handleValue,
      this.handleEqual);

  @override
  State<ButtonList> createState() => _State();
}

class _State extends State<ButtonList> {
  late final List<Widget> operationButtons;
  late final List<Widget> numberButtons;

  var operation = operations[1];
  var shouldClearAll = true;

  @override
  void initState() {
    super.initState();
    operationButtons = [
      for (final operation in operations)
        Expanded(
            child: OutlinedButton(
                onPressed: () {
                  setState(() {
                    this.operation = operation;
                  });
                  widget.handleOperation();
                },
                child: Text(operation.symbol)))
    ];
    numberButtons = [
      for (final number in <double>[0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        Expanded(
            child: OutlinedButton(
                onPressed: () {
                  widget.handleNumber(number);
                  setState(() {
                    shouldClearAll = false;
                  });
                },
                child: Text(number.toString()))),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Row(children: [
        Expanded(
            child: shouldClearAll
                ? OutlinedButton(
                    onPressed: widget.handleClearAll, child: Text('AC'))
                : OutlinedButton(
                    onPressed: () {
                      widget.handleClear();
                      setState(() {
                        shouldClearAll = true;
                      });
                    },
                    child: Text('C'))),
        Expanded(
            child: OutlinedButton(
                onPressed: () {
                  widget.handleValue((value) {
                    return -value;
                  });
                },
                child: Text('⁺⁄₋'))),
        Expanded(
            child: OutlinedButton(
                onPressed: () {
                  widget.handleValue((value) {
                    return value / 100;
                  });
                },
                child: Text('%'))),
        operationButtons[3],
      ]),
      Row(children: [
        numberButtons[7],
        numberButtons[8],
        numberButtons[9],
        operationButtons[2],
      ]),
      Row(children: [
        numberButtons[4],
        numberButtons[5],
        numberButtons[6],
        operationButtons[1],
      ]),
      Row(children: [
        numberButtons[1],
        numberButtons[2],
        numberButtons[3],
        operationButtons[0],
      ]),
      Row(children: [
        Expanded(flex: 3, child: numberButtons[0]),
        Expanded(
            flex: 1,
            child: OutlinedButton(
                onPressed: () {
                  widget.handleEqual(operation);
                },
                child: Text('=')))
      ])
    ]);
  }
}
