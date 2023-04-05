import 'package:app/pages/admin/admin.dart';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:motion_toast/motion_toast.dart';

import 'package:app/pages/login/login.dart';


class RegisterView extends StatefulWidget {
  const RegisterView({super.key});

  @override
  State<RegisterView> createState() =>
      _RegisterView();
}

void _onSubmit() async {
  final url = Uri.parse('http://localhost:3002/register');
  final headers = {'Content-Type': 'application/json'};
  final body = jsonEncode({
    'name': 'John Doe',
    'email': 'john.doe@example.com',
    'password': '123123131312',
    'type': 'DRIVER'
  });

  final response = await http.post(url, headers: headers, body: body);

  if (response.statusCode == 201) {
    // Formulário enviado com sucesso
  } else {
    // Ocorreu um erro ao enviar o formulário
  }
}

class _RegisterView extends State<RegisterView> {
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
        builder: (BuildContext context) =>
            Container(
              height: 216,
              padding: const EdgeInsets.only(top: 6.0),
              // The Bottom margin is provided to align the popup above the system navigation bar.
              margin: EdgeInsets.only(
                bottom: MediaQuery
                    .of(context)
                    .viewInsets
                    .bottom,
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
                    ), Center(
                      child: Row(
                        children: <Widget>[
                          const Text('Tipo de usuário: '),
                          CupertinoButton(
                            padding: EdgeInsets.zero,
                            // Display a CupertinoPicker with list of fruits.
                            onPressed: () =>
                                _showDialog(
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
                                    List<Widget>.generate(
                                        _userTypes.length, (int index) {
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
                            ),
                          ),
                        ],
                      ),
                    ),
                    Row(
                      children: [
                        Expanded(
                            child: Padding(
                              padding: const EdgeInsets.only(
                                  top: 0,
                                  bottom: 82,
                                  left: 0,
                                  right: 0
                              ),
                              child: CupertinoButton.filled(
                                onPressed: () {
                                  _onSubmit();
                                  Navigator.push(
                                    context,
                                    CupertinoPageRoute(
                                        builder: (context) => LoginView()),
                                  );
                                },
                                child: const Text(
                                  'Fazer cadastro',
                                  textAlign: TextAlign.center,
                                ),
                              ),
                            )
                        ),
                      ],
                    )
                  ],
                ),
              )),
        ));
  }
}
