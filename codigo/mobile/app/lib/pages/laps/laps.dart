import 'package:app/pages/home/components/body.dart';
import 'package:app/pages/home/components/footer.dart';
import 'package:app/pages/home/components/header.dart';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Lap {
  final bool isAdditional;
  final int lapNumber;
  final String remainingGas;
  final String tyreType;
  final int minutes;
  final int seconds;
  final int milliseconds;
  final int id;

  Lap(
      {required this.isAdditional,
      required this.lapNumber,
      required this.remainingGas,
      required this.tyreType,
      required this.minutes,
      required this.seconds,
      required this.milliseconds,
      required this.id});
}

class LapsView extends StatefulWidget {
  @override
  _LapsView createState() => _LapsView();
}

class _LapsView extends State<LapsView> {
  final String image = "";
  final String title = "Corrida 03";
  final String startDate = "03/09";
  final String endDate = "05/09";
  final int laps = 50;
  List<dynamic> _laps = [];

  @override
  void initState() {
    super.initState();
    print('init state');
    fetchLaps();
  }

  void fetchLaps() async {
    try {
      Response response =
          await Dio().get('http://localhost:8000/api/laps/race/1/team/9');
      dynamic data = response.data;
      dynamic driverInfo = response.data;
      print(driverInfo);

      dynamic laps = driverInfo
          .map((item) => Lap(
                id: item['id'],
                lapNumber: item['lapNumber'],
                isAdditional: item['isAdditional'],
                remainingGas: item['remainingGas'],
                tyreType: item['tyreType'],
                minutes: 00,
                seconds: 23,
                milliseconds: 23
              ))
          .toList();

      setState(() {
        _laps = laps;
      });
    } catch (error) {
      print('Erro ao carregar as corridas: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text("Minhas voltas"),
      ),
      child: SafeArea(
          child: Container(
        height: MediaQuery.of(context).size.height - 150,
        child: CupertinoScrollbar(
          child: ListView.builder(
            itemCount: _laps.length,
            itemBuilder: (BuildContext context, int index) {
              Lap lap = _laps[index];

              return Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    child: Card(
                        elevation: 5,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        margin: EdgeInsets.symmetric(vertical: 12.0),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(8.0),
                          child: Container(
                            decoration: BoxDecoration(
                              image: DecorationImage(
                                image: AssetImage('assets/gradient.png'),
// substitua pelo caminho da sua imagem
                                fit: BoxFit.cover,
                              ),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(16.0),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        'Volta ${lap.lapNumber ?? 'N/A'}',
                                        style: TextStyle(
                                          fontSize: 20.0,
                                          color: CupertinoColors.white,
                                          fontWeight: FontWeight.w500,
                                        ),
                                      ),
                                      SizedBox(height: 16.0),
                                      Text(
                                        '${lap.minutes}m ${lap.seconds}s ${lap.milliseconds}ms',
                                        style: TextStyle(
                                          fontSize: 26.0,
                                          fontWeight: FontWeight.w600,
                                          color: CupertinoColors.white,
                                        ),
                                      ),
                                      SizedBox(height: 8.0),
                                      Text(
                                        'Tanque atual: ${lap.remainingGas}L',
                                        style: TextStyle(
                                          fontSize: 16.0,
                                          color: CupertinoColors.white,
                                        ),
                                      ),
                                      Text(
                                        'Tipo de Pneu: ${lap.tyreType}',
                                        style: TextStyle(
                                          fontSize: 16.0,
                                          color: CupertinoColors.white,
                                        ),
                                      ),
                                      Text(
                                        'Tempo Adicional: ${lap.isAdditional ? 'Sim' : 'Não'}',
                                        style: TextStyle(
                                          fontSize: 16.0,
                                          color: CupertinoColors.white,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        )),
                  ),
                ],
              );
            },
          ),
        ),
      )),
    );
  }
}
