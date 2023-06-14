import 'package:app/pages/notes/components/stickyNotes.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('Teste do componente StickyNote', (WidgetTester tester) async {
    // Construir o widget do StickyNote dentro do MaterialApp
    await tester.pumpWidget(
      MaterialApp(
        home: StickyNote(
          id: '1',
          color: Colors.yellow,
          text: 'Título',
          description: 'Descrição',
          callback: () {},
        ),
      ),
    );

    // Verificar se o título e a descrição estão sendo exibidos corretamente
    expect(find.text('Título'), findsOneWidget);
    expect(find.text('Descrição'), findsOneWidget);
  });
}
