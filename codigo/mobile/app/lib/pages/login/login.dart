import 'package:app/pages/login/components/header.dart';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:alert/alert.dart';

import 'package:app/shared/validators/email.validator.dart';
import 'package:app/shared/validators/form_field.validator.dart';
import 'package:app/pages/register/register.dart';
import 'package:app/pages/admin/admin.dart';
import 'package:app/pages/register/components/footer.dart';

class LoginView extends StatefulWidget {
  @override
  _LoginView createState() => _LoginView();
}

void _onSubmit(String email, String password) async {
  final url = Uri.parse('http://localhost:8000/api/auth/login');
  final headers = {'Content-Type': 'application/json'};
  final body = jsonEncode({
    'email': email,
    'password': password,
  });

  final response = await http.post(url, headers: headers, body: body);

  final isStatusSuccess =
      response.statusCode == 200 || response.statusCode == 201;

  print(response.statusCode);
  if (isStatusSuccess) {
    // Formulário enviado com sucesso
  } else {
    Alert(message: 'Usuário não encontrado 😔').show();
  }
}

class _LoginView extends State<LoginView> {
  late TextEditingController _email = TextEditingController();
  late TextEditingController _password = TextEditingController();
  final _formKey = GlobalKey<FormState>();

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

  void _handleLogin() {
    String email = _email.text;
    String password = _password.text;

    _onSubmit(email, password);
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Login'),
        leading: GestureDetector(
          child: const Icon(
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
          child: Form(
        key: _formKey,
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
                              validator: (value) {
                                FieldValidator.getEmptyValuesMessage(
                                    value!, 'email');

                                if (!EmailValidator.isValid(value!)) {
                                  return 'Insira um email válido';
                                }
                                return null;
                              },
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
                              validator: (value) {
                                if (value == null || value.isEmpty) {
                                  return 'Preencha o campo de senha';
                                }
                                return null;
                              },
                            )),
                      ],
                    ))),
            Padding(
                padding: EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SizedBox(
                      width: double.infinity,
                      child: CupertinoButton(
                        color: CupertinoColors.darkBackgroundGray,
                        onPressed: () {
                          if (_formKey.currentState!.validate()) {
                            _handleLogin();
                            Navigator.push(
                              context,
                              CupertinoPageRoute(
                                  builder: (context) => AdminView()),
                            );
                          }
                        },
                        child: const Text('Fazer login'),
                      ),
                    ),
                    SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity,
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
      )),
    );
  }
}
