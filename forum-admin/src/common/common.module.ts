import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { LoggingMiddleware } from "./middleware/logging.middleware";
import { JwtAuthGuard } from "../modules/auth/guards/jwt-auth.guard";
import { BcryptService } from "./utils/bcrypt.service";
import { SvgCaptchaService } from "./utils/svg-capcha.service";
import { ValidateRolesService } from "./utils/validate-roles.service";

const SERVICES = [
    BcryptService,
    SvgCaptchaService,
    ValidateRolesService
];

@Module({
    imports: [ConfigModule],
    providers: [
        {
        provide: APP_GUARD,
        useClass: JwtAuthGuard
    },
        ...SERVICES
    ],
    exports: [...SERVICES]
})
export class CommonModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggingMiddleware).forRoutes('*');
    }
}
