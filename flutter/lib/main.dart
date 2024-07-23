import 'package:flutter/material.dart';
import 'calculator.dart';
import 'paper_tape_entry.dart';

void main() {
  runApp(MaterialApp(title: 'Calculator', home: Scaffold(body: App())));
}

class App extends StatefulWidget {
  @override
  State<App> createState() {
    return _AppState();
  }
}

class _AppState extends State<App> {
  var paperTapeEntries = <PaperTapeEntry>[];

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Calculator((entry) {
        setState(() {
          paperTapeEntries = [...paperTapeEntries, entry];
        });
      }),
      Container(
          decoration: BoxDecoration(
            border: Border.all(width: 1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: IntrinsicWidth(
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                Container(
                    decoration:
                        BoxDecoration(border: Border(bottom: BorderSide())),
                    child: Center(
                        child: Text('Paper Tape',
                            style: TextStyle(fontSize: 16)))),
                SizedBox(
                    height: 256,
                    width: 256,
                    child: ListView(children: [
                      for (final entry in paperTapeEntries)
                        Text(
                            '${entry.operand1} ${entry.operator} ${entry.operand2}\n= ${entry.value}\n',
                            style: TextStyle(fontSize: 16))
                    ])),
                Container(
                    padding: EdgeInsets.all(4),
                    decoration:
                        BoxDecoration(border: Border(top: BorderSide())),
                    alignment: Alignment.centerRight,
                    child: OutlinedButton(
                        child: Text('Clear'),
                        onPressed: () {
                          setState(() {
                            paperTapeEntries = [];
                          });
                        }))
              ])))
    ]);
  }
}
