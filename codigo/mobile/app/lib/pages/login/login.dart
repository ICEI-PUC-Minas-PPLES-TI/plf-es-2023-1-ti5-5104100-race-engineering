import 'package:app/pages/home/components/body.dart';
import 'package:app/pages/home/components/footer.dart';
import 'package:app/pages/login/components/header.dart';
import 'package:flutter/cupertino.dart';
import 'package:app/pages/login/login.dart';
import 'package:app/pages/register/register.dart';

class LoginView extends StatefulWidget {
  @override
  _LoginView createState() => _LoginView();
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
      navigationBar: CupertinoNavigationBar(
        middle: Text('Login'),
        leading: GestureDetector(
          child: Icon(
            CupertinoIcons.back,
            color: CupertinoColors
                .darkBackgroundGray, // Define a cor da seta de voltar
          ),
          onTap: () {
            Navigator.of(context).pop(); // Comportamento de voltar
          },
        ),
      ),
      child: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(
                flex: 5,
                child: Padding(
                    padding: const EdgeInsets.all(16), child: Header())),
            Expanded(
                flex: 3,
                child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        CupertinoFormRow(
                            prefix: Text("Email "),
                            child: CupertinoTextFormFieldRow(
                              controller: _email,
                              placeholder: "Insira seu email",
                            )),
                        const SizedBox(
                          height: 8,
                        ),
                        CupertinoFormRow(
                            prefix: Text("Senha"),
                            child: CupertinoTextFormFieldRow(
                              controller: _password,
                              placeholder: "Insira sua senha",
                              obscureText: true,
                            )),

                      ],
                    ))),
            Padding(
                padding: EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SizedBox(
                      width: double.infinity, // largura igual à tela
                      child: CupertinoButton(
                        color: CupertinoColors.darkBackgroundGray,
                        onPressed: () {
                          Navigator.push(
                            context,
                            CupertinoPageRoute(
                                builder: (context) => LoginView()),
                          );
                        },
                        child: const Text('Fazer login'),
                      ),
                    ),
                    SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity, // largura igual à tela
                      child: CupertinoButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            CupertinoPageRoute(
                                builder: (context) => RegisterView()),
                          );
                        },
                        child: Text(
                          'Criar conta',
                          style: CupertinoTheme.of(context)
                              .textTheme
                              .navTitleTextStyle,
                        ),
                      ),
                    ),
                  ],
                ))
          ],
        ),
      ),
    );
  }
}
