import 'package:app/model/note/note.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:app/model/note/note.dart';
import 'package:uuid/uuid.dart';

void main() {
  group('Note', () {
    test('should create a new note with a generated id if id is not provided', () {
      final note = Note(
        title: 'Test Title',
        description: 'Test Description',
        color: Color(0xFF000000),
      );

      expect(note.id, isNotNull);
    });

    test('should create a new note with the provided id', () {
      final id = Uuid().v4();
      final note = Note(
        id: id,
        title: 'Test Title',
        description: 'Test Description',
        color: Color(0xFF000000),
      );

      expect(note.id, id);
    });

    test('should convert a note to a map', () {
      final note = Note(
        title: 'Test Title',
        description: 'Test Description',
        color: Color(0xFF000000),
      );

      final map = note.toMap();

      expect(map['id'], note.id);
      expect(map['title'], note.title);
      expect(map['description'], note.description);
      expect(map['color'], note.color.value);
    });

    test('should convert a map to a note', () {
      final id = Uuid().v4();
      final map = {
        'id': id,
        'title': 'Test Title',
        'description': 'Test Description',
        'color': Color(0xFF000000).value,
      };

      final note = Note.fromMap(map);

      expect(note.id, id);
      expect(note.title, map['title']);
      expect(note.description, map['description']);
      expect(note.color.value, map['color']);
    });

    test('should return the correct string representation of a note', () {
      final note = Note(
        title: 'Test Title',
        description: 'Test Description',
        color: Color(0xFF000000),
      );

      final expectedString = 'Note(id: ${note.id}, title: ${note.title}, description: ${note.description}, color: ${note.color})';

      expect(note.toString(), expectedString);
    });
  });
}




