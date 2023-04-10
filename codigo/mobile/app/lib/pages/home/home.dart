import 'package:app/pages/home/components/body.dart';
import 'package:app/pages/home/components/footer.dart';
import 'package:app/pages/home/components/header.dart';
import 'package:flutter/cupertino.dart';


class HomeView extends StatefulWidget {
  @override
  _HomeView createState() => _HomeView();
}

class _HomeView extends State<HomeView> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      child: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(
                flex: 5,
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Header()
                )),
            Expanded(
                flex: 3,
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Body()
                )),
      Padding(
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: Footer()
      ),
        ],
        ),
      ),
    );
  }
}
