import 'package:flutter/cupertino.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:app/model/note/note.dart';
import 'package:app/services/database/DatabaseHelper.dart';
import 'package:app/pages/notes/components/notesForm.dart';

class MockDatabaseHelper extends Mock implements DatabaseHelper {}

void main() {
  group('NotesForm', () {
    late NotesForm notesForm;
    late MockDatabaseHelper mockDatabaseHelper;

    setUp(() {
      notesForm = NotesForm();
      mockDatabaseHelper = MockDatabaseHelper();
    });

    testWidgets('should add a note when form is submitted', (WidgetTester tester) async {
      await tester.pumpWidget(
        CupertinoApp(
          home: notesForm,
        ),
      );

      final titleField = find.byKey(Key('title_field'));
      final descriptionField = find.byKey(Key('description_field'));
      final saveButton = find.byKey(Key('save_button'));

      await tester.enterText(titleField, 'Test Title');
      await tester.enterText(descriptionField, 'Test Description');
      await tester.tap(saveButton);
      await tester.pump();

      verify(mockDatabaseHelper.create(Note(
        title: 'Test Title',
        description: 'Test Description',
        color: CupertinoColors.systemYellow,
        id: '',
      ))).called(1);
    });
  });
}