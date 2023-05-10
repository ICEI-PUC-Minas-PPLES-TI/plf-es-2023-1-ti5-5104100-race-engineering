import '../../../services/database/DatabaseHelper.dart';
import 'package:flutter/cupertino.dart';

class StickyNote extends StatelessWidget {
  final Color color;
  final String text;
  final String description;
  final String id;

  const StickyNote({
    required this.id,
    required this.color,
    required this.text,
    required this.description,
  });

  Future<void> onDeleteNote() async {
    await DatabaseHelper.instance.delete(id);
    await DatabaseHelper.instance.readAll();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: EdgeInsets.symmetric(vertical: 8),
        child: Container(
          width: double
              .infinity, // Define a largura como 100% do espaço disponível
          child: Dismissible(
            key: UniqueKey(),
            direction: DismissDirection.endToStart,
            onDismissed: (direction) {
              if (direction == DismissDirection.endToStart) {
                onDeleteNote();
              }
            },
            // background: Container(
            //   color: CupertinoColors.destructiveRed,
            //   child: Row(
            //     mainAxisAlignment: MainAxisAlignment.spaceBetween,
            //     children: [
            //       Padding(
            //         padding: EdgeInsets.only(left: 16.0),
            //         child: Icon(
            //           CupertinoIcons.delete,
            //           color: CupertinoColors.white,
            //         ),
            //       ),
            //       Padding(
            //         padding: EdgeInsets.only(right: 16.0),
            //         child: Icon(
            //           CupertinoIcons.create,
            //           color: CupertinoColors.white,
            //         ),
            //       ),
            //     ],
            //   ),
            // ),
            child: Container(
              decoration: BoxDecoration(
                color: color,
                borderRadius: BorderRadius.circular(8.0),
              ),
              padding: EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: EdgeInsets.only(bottom: 8),
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        text,
                        style: TextStyle(
                          fontSize: 18.0,
                          fontWeight: FontWeight.w500,
                          color: CupertinoTheme.of(context)
                              .textTheme
                              .textStyle
                              .color,
                        ),
                      ),
                    ),
                  ),
                  Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      description,
                      style: TextStyle(
                        fontSize: 14.0,
                        fontWeight: FontWeight.w300,
                        color: CupertinoTheme.of(context)
                            .textTheme
                            .textStyle
                            .color,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ));
  }
}
