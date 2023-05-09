import 'package:flutter/cupertino.dart';

import 'components/notesForm.dart';

class StickyNotesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Criar uma nova nota'),
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Center(
                child: CupertinoButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      CupertinoPageRoute(
                          builder: (context) => NotesForm()),
                    );
                  },

                  child: Center(
                    child: Row(
                      children: [
                        Text('Criar uma nova nota', style: CupertinoTheme.of(context).textTheme.navTitleTextStyle,),
                        Icon(
                          CupertinoIcons.add,
                          size: 28.0,
                          color: CupertinoTheme.of(context).textTheme.navTitleTextStyle.color,
                        )
                      ],
                    ),
                  )
                ),
              ),
              StickyNote(
                color: CupertinoColors.systemYellow,
                text: 'Note 1',
              ),
              SizedBox(height: 16.0),
              StickyNote(
                color: CupertinoColors.systemTeal,
                text: 'Note 2',
              ),
              SizedBox(height: 16.0),
              StickyNote(
                color: CupertinoColors.systemPink,
                text: 'Note 3',
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class StickyNote extends StatelessWidget {
  final Color color;
  final String text;

  const StickyNote({
    required this.color,
    required this.text,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(8.0),
      ),
      padding: EdgeInsets.all(16.0),
      child: Text(
        text,
        style: CupertinoTheme.of(context).textTheme.textStyle,
      ),
    );
  }
}
