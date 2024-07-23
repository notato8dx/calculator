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
      Column(children: [
        Text('Paper Tape'),
        SizedBox(
            height: 256,
            width: 256,
            child: ListView(
                children: paperTapeEntries.map((entry) {
              return Column(children: [
                Text('${entry.operand1} ${entry.operator} ${entry.operand2}'),
                Text('= ${entry.value}\n')
              ]);
            }).toList())),
        OutlinedButton(
            child: Text('Clear'),
            onPressed: () {
              setState(() {
                paperTapeEntries = [];
              });
            })
      ])
    ]);
  }
}
