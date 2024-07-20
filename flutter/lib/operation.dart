class Operation {
  final String symbol;
  final String symbolASCII;
  final double Function(double, double) operate;

  const Operation(this.symbol, this.symbolASCII, this.operate);
}
