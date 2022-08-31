import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    /*const message = exception.message;*/
    const erResponse = exception.getResponse();

    Logger.log(erResponse, '错误信息');
    const errorResponse = {
      data: erResponse, // 获取全部错误信息
      code: 1, //自定义code
      url: request.originalUrl // 错误的url地址
    }
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    // 设置返回参数
    response.status(status);
    response.header('Content-Type', 'application/json;charset=utf-8');
    response.send(errorResponse);
  }
}
