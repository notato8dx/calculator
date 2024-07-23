import 'package:flutter/material.dart';
import 'operation.dart';

var operations = [
  Operation('+', '+', (operand1, operand2) {
    return operand1 + operand2;
  }),
  Operation('−', '-', (operand1, operand2) {
    return operand1 - operand2;
  }),
  Operation('×', '*', (operand1, operand2) {
    return operand1 * operand2;
  }),
  Operation('÷', '/', (operand1, operand2) {
    return operand1 / operand2;
  }),
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
  State<ButtonList> createState() {
    return _State();
  }
}

class _State extends State<ButtonList> {
  final ButtonStyle operationButtonStyle = OutlinedButton.styleFrom(
      backgroundColor: Color(0xffff9d0b),
      foregroundColor: Color(0xffffffff),
      shape: LinearBorder(),
      fixedSize: Size(58, 48),
      padding: EdgeInsets.all(0));
  final ButtonStyle valueButtonStyle = OutlinedButton.styleFrom(
      backgroundColor: Color(0xff4c4c4c),
      foregroundColor: Color(0xffffffff),
      shape: LinearBorder(),
      fixedSize: Size(58, 48),
      padding: EdgeInsets.all(0));
  late final List<Widget> operationButtons;
  late final List<Widget> numberButtons;

  var operation = operations[0];
  var shouldClearAll = true;

  @override
  void initState() {
    super.initState();
    operationButtons = [
      for (final operation in operations)
        Expanded(
            child: OutlinedButton(
                style: operationButtonStyle,
                onPressed: () {
                  setState(() {
                    this.operation = operation;
                  });
                  widget.handleOperation();
                },
                child: Text(operation.symbol, style: TextStyle(fontSize: 20))))
    ];
    numberButtons = [
      for (final number in <double>[0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        Expanded(
            child: OutlinedButton(
                style: OutlinedButton.styleFrom(
                    backgroundColor: Color(0xff696969),
                    foregroundColor: Color(0xffffffff),
                    shape: LinearBorder(),
                    fixedSize: Size(58, 48),
                    padding: EdgeInsets.all(0)),
                onPressed: () {
                  widget.handleNumber(number);
                  setState(() {
                    shouldClearAll = false;
                  });
                },
                child:
                    Text(number.toString(), style: TextStyle(fontSize: 20)))),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Row(children: [
        Expanded(
            child: shouldClearAll
                ? OutlinedButton(
                    style: valueButtonStyle,
                    onPressed: widget.handleClearAll,
                    child: Text('AC', style: TextStyle(fontSize: 20)))
                : OutlinedButton(
                    style: valueButtonStyle,
                    onPressed: () {
                      widget.handleClear();
                      setState(() {
                        shouldClearAll = true;
                      });
                    },
                    child: Text('C', style: TextStyle(fontSize: 20)))),
        SizedBox(width: 1),
        Expanded(
            child: OutlinedButton(
                style: valueButtonStyle,
                onPressed: () {
                  widget.handleValue((value) {
                    return -value;
                  });
                },
                child: Text('⁺⁄₋', style: TextStyle(fontSize: 20)))),
        SizedBox(width: 1),
        Expanded(
            child: OutlinedButton(
                style: valueButtonStyle,
                onPressed: () {
                  widget.handleValue((value) {
                    return value / 100;
                  });
                },
                child: Text('%', style: TextStyle(fontSize: 20)))),
        SizedBox(width: 1),
        operationButtons[3],
      ]),
      SizedBox(height: 1),
      Row(children: [
        numberButtons[7],
        SizedBox(width: 1),
        numberButtons[8],
        SizedBox(width: 1),
        numberButtons[9],
        SizedBox(width: 1),
        operationButtons[2],
      ]),
      SizedBox(height: 1),
      Row(children: [
        numberButtons[4],
        SizedBox(width: 1),
        numberButtons[5],
        SizedBox(width: 1),
        numberButtons[6],
        SizedBox(width: 1),
        operationButtons[1],
      ]),
      SizedBox(height: 1),
      Row(children: [
        numberButtons[1],
        SizedBox(width: 1),
        numberButtons[2],
        SizedBox(width: 1),
        numberButtons[3],
        SizedBox(width: 1),
        operationButtons[0],
      ]),
      SizedBox(height: 1),
      Row(children: [
        Expanded(flex: 3, child: numberButtons[0]),
        SizedBox(width: 1),
        Expanded(
            flex: 1,
            child: OutlinedButton(
                style: operationButtonStyle,
                onPressed: () {
                  widget.handleEqual(operation);
                },
                child: Text('=', style: TextStyle(fontSize: 20))))
      ])
    ]);
  }
}
