import 'package:flutter/cupertino.dart';
import 'package:app/pages/register/register.dart';
import 'package:app/pages/admin/admin.dart';


class LoginView extends StatefulWidget {
  const LoginView({super.key});

  @override
  State<LoginView> createState() =>
      _LoginView();
}

class _LoginView extends State<LoginView> {
  late TextEditingController _email;
  late TextEditingController _password;

  @override
  void initState() {
    super.initState();
    _email = TextEditingController();
    _password = TextEditingController();
  }

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
        navigationBar: const CupertinoNavigationBar(
          middle: Text('Login'),
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
                        controller: _email,
                        placeholder: "Email",
                      ),
                    ),
                    Padding(
                      padding:
                      EdgeInsets.only(top: 8, bottom: 16, left: 0, right: 0),
                      child: CupertinoTextField(
                        controller: _password,
                        placeholder: "Senha",
                        obscureText: true,
                      ),
                    ),
                    Column(
                      mainAxisSize: MainAxisSize.min,
                      children: <Widget>[
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Expanded(
                              child: CupertinoButton(
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    CupertinoPageRoute(builder: (context) => RegisterView()),
                                  );
                                },
                                child: const Text('Cadastro'),
                              ),
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: CupertinoButton.filled(
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    CupertinoPageRoute(builder: (context) => AdminView()),
                                  );
                                },
                                child: const Text('Login'),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              )
          ),
        ));
  }
}
