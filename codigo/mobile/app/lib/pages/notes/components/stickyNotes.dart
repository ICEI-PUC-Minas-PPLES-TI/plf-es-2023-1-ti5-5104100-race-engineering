import 'package:flutter/cupertino.dart';

class StickyNote extends StatelessWidget {
  final Color color;
  final String text;
  final String description;

  const StickyNote({
    required this.color,
    required this.text,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(8.0),
      ),
      padding: EdgeInsets.all(16.0),
      child: Column(
        children: [
          Text(
            text,
            style: CupertinoTheme.of(context).textTheme.textStyle,
          ),
          Text(
            description,
            style: CupertinoTheme.of(context).textTheme.textStyle,
          ),
        ],
      )
    );
  }
}

// CupertinoScrollbar(
// child: ListView.builder(
// itemCount: _notes.length,
// itemBuilder: (context, index) {
// final note = _notes[index];
// return Column(
// children: [
// StickyNote(
// color: note.color,
// text: note.title,
// description: note.description,
// ),
// SizedBox(height: 16.0),
// ],
// );
// },
// ),
// )