import 'package:flutter/material.dart';
import 'paper_tape_entry.dart';
import 'button_list.dart';

class Calculator extends StatefulWidget {
  final void Function(PaperTapeEntry) addPaperTapeEntry;

  const Calculator(this.addPaperTapeEntry);

  @override
  State<Calculator> createState() {
    return _State();
  }
}

class _State extends State<Calculator> {
  double display = 0;
  double operand = 0;
  var operationComplete = true;
  var overwritable = true;

  @override
  Widget build(BuildContext context) {
    return Container(
        color: Color(0xFF383838),
        child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Row(mainAxisAlignment: MainAxisAlignment.end, children: [
                Text(display.toString(),
                    style: TextStyle(color: Color(0xffffffff), fontSize: 48))
              ]),
              Row(mainAxisAlignment: MainAxisAlignment.end, children: [
                IntrinsicWidth(
                    child: Column(children: [
                  ButtonList(
                    operationComplete,
                    () {
                      setState(() {
                        operationComplete = false;
                        overwritable = true;
                        operand = display;
                      });
                    },
                    (number) {
                      if (overwritable) {
                        setState(() {
                          display = number;
                          overwritable = false;
                        });
                      } else {
                        setState(() {
                          display = display * 10 + number;
                        });
                      }
                    },
                    () {
                      setState(() {
                        display = 0;

                        if (!operationComplete && overwritable) {
                          display = operand;
                          operationComplete = true;
                          operand = 0;
                        }

                        overwritable = true;
                      });
                    },
                    () {
                      setState(() {
                        display = 0;
                        operationComplete = true;
                        operand = 0;
                      });
                    },
                    (getNewValue) {
                      setState(() {
                        display = getNewValue(display);
                      });
                    },
                    (operation) {
                      final [operand1, operand2] = operationComplete
                          ? [display, operand]
                          : [operand, display];
                      final value = operation.operate(operand1, operand2);

                      widget.addPaperTapeEntry(PaperTapeEntry(
                          operand1, operand2, operation.symbolASCII, value));

                      setState(() {
                        if (!operationComplete) {
                          operand = display;
                          operationComplete = true;
                          overwritable = true;
                        }

                        display = value;
                      });
                    },
                  ),
                ]))
              ])
            ]));
  }
}
