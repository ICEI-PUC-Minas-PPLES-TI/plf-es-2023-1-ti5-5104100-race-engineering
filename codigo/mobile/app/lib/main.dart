import 'package:flutter/cupertino.dart';

import 'package:app/pages/login/login.dart';
import 'package:app/pages/home/home.dart';

void main() => runApp(const CupertinoTextFieldApp());

class CupertinoTextFieldApp extends StatelessWidget {
  const CupertinoTextFieldApp({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      theme: CupertinoThemeData(brightness: Brightness.light),
      home: HomeView(),
    );
  }
}

class CupertinoTextFieldExample extends StatefulWidget {
  const CupertinoTextFieldExample({super.key});

  @override
  State<CupertinoTextFieldExample> createState() =>
      _CupertinoTextFieldExampleState();
}

class _CupertinoTextFieldExampleState extends State<CupertinoTextFieldExample> {
  late TextEditingController _email;
  late TextEditingController _password;
  late TextEditingController _name;
  static const double _kItemExtent = 32.0;
  static const List<String> _userTypes = <String>[
    'Analista',
    'Piloto',
    'Mecânico'
  ];

  int _selectedUserType = 0;

  void _showDialog(Widget child) {
    showCupertinoModalPopup<void>(
        context: context,
        builder: (BuildContext context) => Container(
          height: 216,
          padding: const EdgeInsets.only(top: 6.0),
          // The Bottom margin is provided to align the popup above the system navigation bar.
          margin: EdgeInsets.only(
            bottom: MediaQuery.of(context).viewInsets.bottom,
          ),
          // Provide a background color for the popup.
          color: CupertinoColors.systemBackground.resolveFrom(context),
          // Use a SafeArea widget to avoid system overlaps.
          child: SafeArea(
            top: false,
            child: child,
          ),
        ));
  }

  @override
  void initState() {
    super.initState();
    _email = TextEditingController();
    _password = TextEditingController();
    _name = TextEditingController();
  }

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    _name.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
        navigationBar: CupertinoNavigationBar(
          middle: Text('Cadastro de usuário'),

        ),
        child: SafeArea(
          child: Center(
              child: Padding(
            padding: EdgeInsets.all(16),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                  padding:
                  EdgeInsets.only(top: 0, bottom: 8, left: 0, right: 0),
                  child: CupertinoTextField(
                    controller: _name,
                    placeholder: "Nome completo",
                  ),
                ),
                Padding(
                  padding:
                      EdgeInsets.only(top: 8, bottom: 8, left: 0, right: 0),
                  child: CupertinoTextField(
                    controller: _email,
                    placeholder: "Email",
                    obscureText: true,
                  ),
                ),
                Padding(
                  padding:
                      EdgeInsets.only(top: 8, bottom: 8, left: 0, right: 0),
                  child: CupertinoTextField(
                    controller: _password,
                    placeholder: "Senha",
                    obscureText: true,
                  ),
                ),Center(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      const Text('Tipo de usuário: '),
                      CupertinoButton(
                        padding: EdgeInsets.zero,
                        // Display a CupertinoPicker with list of fruits.
                        onPressed: () => _showDialog(
                          CupertinoPicker(
                            magnification: 1.22,
                            squeeze: 1.2,
                            useMagnifier: true,
                            itemExtent: _kItemExtent,
                            // This is called when selected item is changed.
                            onSelectedItemChanged: (int selectedItem) {
                              setState(() {
                                _selectedUserType = selectedItem;
                              });
                            },
                            children:
                            List<Widget>.generate(_userTypes.length, (int index) {
                              return Center(
                                child: Text(
                                  _userTypes[index],
                                ),
                              );
                            }),
                          ),
                        ),
                        // This displays the selected fruit name.
                        child: Text(
                          _userTypes[_selectedUserType],
                          style: const TextStyle(
                            fontSize: 22.0,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Row(
                  children: [
                    Expanded(
                      child: CupertinoButton.filled(
                        onPressed: () {
                          // Ação do segundo botão
                        },
                        child: const Text(
                          'Fazer cadastro',
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                  ],
                )
              ],
            ),
          )),
        ));
  }
}
