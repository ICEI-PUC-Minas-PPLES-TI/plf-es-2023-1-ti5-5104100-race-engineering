import 'package:flutter/cupertino.dart';

import 'package:app/pages/races/races.dart';

class AdminView extends StatefulWidget {
  const AdminView({super.key});

  @override
  State<AdminView> createState() =>
      _AdminView();
}

class _AdminView extends State<AdminView> {

  @override
  Widget build(BuildContext context) {


    return CupertinoTabScaffold(
      tabBar: CupertinoTabBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.car_detailed),
            label: 'Corridas',
          ),
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.clock_fill),
            label: 'Voltas',
          ),
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.person_alt_circle_fill),
            label: 'Perfil',
          ),
        ],
      ),
      tabBuilder: (BuildContext context, int index) {
        return CupertinoTabView(
          builder: (BuildContext context) {
            return Center(
              child: ListView.builder(
                itemCount: 2, // quantidade de cards na tela
                itemBuilder: (context, index) {
                  return RacesView();
                },
              ),
            );
          },
        );
      },
    );
  }
}
