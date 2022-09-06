import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { ExceptionInterceptor } from "./common/interceptor/exception.interceptor";
import { TimeoutInterceptor } from "./common/interceptor/timeout.interceptor";
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //配置验证规则
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true, //是否开启类型转换 开启后网络字符串获取参数时会自动转换
    transformOptions: {
      enableImplicitConversion: true // 设置为true则在DTO文件中不需要申明@Type(() => Number)即可实现网络字符串转换
    }
  }));
  //配置swaggerUI
  const config = new DocumentBuilder()
      .setTitle('接口文档')
      .setDescription('论坛系统接口文档')
      .setVersion('1.0')
      /* .addTag('users')*/
      .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  //全局注册拦截器
  await app.useGlobalInterceptors(new ExceptionInterceptor(), new TimeoutInterceptor());
  //全局注册过滤器
  await app.useGlobalFilters(new HttpExceptionFilter());

  // 注册session
  app.use(
      session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
      }),
  );

  await app.listen(3000);
}
bootstrap();
