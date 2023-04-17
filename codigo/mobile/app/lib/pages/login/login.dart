import 'package:app/pages/login/components/header.dart';
import 'package:flutter/cupertino.dart';
import 'package:alert/alert.dart';

import 'package:app/shared/validators/email.validator.dart';
import 'package:app/shared/validators/form_field.validator.dart';
import 'package:app/pages/register/register.dart';
import 'package:app/pages/admin/admin.dart';
import 'package:app/pages/login/components/footer.dart';
import 'package:app/services/http/http.dart';

class LoginView extends StatefulWidget {
  @override
  _LoginView createState() => _LoginView();
}

void _onSubmit(String email, String password) async {
  Request request = Request();
  const endpoint = '/auth/login';
  final body = {
    'email': email,
    'password': password,
  };

  final response = await request.create(endpoint, body);

  if (response.statusCode == 404) {
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
      navigationBar:  CupertinoNavigationBar(
        middle: Text("Login"),
        leading: GestureDetector(
          child: const Icon(
            CupertinoIcons.back,
            color: CupertinoColors
                .darkBackgroundGray, // Define a cor da seta de voltar
          ),
          onTap: () {
            Navigator.of(context).pop();
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
                child: Footer(
                  onCreateAccount: () {},
                  onSubmit: () {
                    Navigator.push(
                      context,
                      CupertinoPageRoute(
                          builder: (context) => AdminView()),
                    );
                  },
                ))
          ],
        ),
      )),
    );
  }
}
