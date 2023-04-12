import 'package:app/pages/home/components/body.dart';
import 'package:app/pages/home/components/footer.dart';
import 'package:app/pages/home/components/header.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class RacesView extends StatefulWidget {
  @override
  _RacesView createState() => _RacesView();
}

class _RacesView extends State<RacesView> {
  final String image = "";
  final String title = "Corrida 01";
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
          child: ListView.builder(
            itemCount: 4, // exemplo com 10 cards
            itemBuilder: (BuildContext context, int index) {
              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Card(
                  elevation: 5,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  margin: EdgeInsets.symmetric(vertical: 12.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(10),
                          topRight: Radius.circular(10),
                        ),
                        child: Image.network(
                          'https://images.unsplash.com/photo-1539057307452-65f8bc136475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                          fit: BoxFit.cover,
                          height: 200,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Título da Corrida',
                              style: TextStyle(
                                fontSize: 24.0,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            SizedBox(height: 8.0),
                            Text(
                              'Data de Início: 01/04/2023',
                              style: TextStyle(fontSize: 16.0),
                            ),
                            SizedBox(height: 8.0),
                            Text(
                              'Data de Fim: 02/04/2023',
                              style: TextStyle(fontSize: 16.0),
                            ),
                            SizedBox(height: 8.0),
                            Text(
                              'Número de Voltas: 10',
                              style: TextStyle(fontSize: 16.0),
                            ),
                          ],
                        ),
                      ),
                      CupertinoButton(
                        child: Text('Ver mais detalhes', style: CupertinoTheme.of(context).textTheme.navTitleTextStyle,),
                        onPressed: () {},
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      )),
    );
  }
}
