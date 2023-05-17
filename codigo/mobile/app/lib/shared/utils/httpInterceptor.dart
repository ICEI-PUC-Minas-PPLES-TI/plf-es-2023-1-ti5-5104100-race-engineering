import 'package:dio/dio.dart';

class HttpInterceptor {
  final Dio dio = Dio();

  void setupInterceptors(String token) {
    print("Meu token de interceptor: " + token);
    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          options.headers['Authorization'] = 'Bearer $token';
          return handler.next(options);
        },
      ),
    );
  }
}