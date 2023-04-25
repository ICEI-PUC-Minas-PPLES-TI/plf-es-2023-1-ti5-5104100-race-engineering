import 'package:app/pages/home/components/body.dart';
import 'package:app/pages/home/components/footer.dart';
import 'package:app/pages/home/components/header.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

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

  // const RaceCard({
  //   required this.image,
  //   required this.title,
  //   required this.startDate,
  //   required this.endDate,
  //   required this.laps,
  // });

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      child: SafeArea(
          child: Container(
        height: MediaQuery.of(context).size.height - 150,
        child: CupertinoScrollbar(
            child: Column(
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
                    // Defina o raio da borda arredondada desejado
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
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: const [
                                Text(
                                  'Tempo da volta 3',
                                  style: TextStyle(
                                    fontSize: 20.0,
                                    color: CupertinoColors.white,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                                SizedBox(height: 16.0),
                                Text(
                                  '1min 28s 836',
                                  style: TextStyle(
                                    fontSize: 26.0,
                                    fontWeight: FontWeight.w600,
                                    color: CupertinoColors.white,
                                  ),
                                ),
                                SizedBox(height: 8.0),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  )),
            ),
            Row(
              children: [
                Text("testandao"),
                Card(
                  elevation: 5,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text("testando")
                )
              ],
            )
          ],
        )),
      )),
    );
  }
}
