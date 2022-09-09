import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from "../users/users.module";
import { LocalStrategy } from "./providers/local.strategy";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY } from "../../constants/common.constants";
import { JwtStrategy } from "./providers/jwt.strategy";
import { CommonModule } from "../../common/common.module";

@Module({
  imports: [ UsersModule, JwtModule, CommonModule, PassportModule.register({
    secret: JWT_KEY.secret,
    signOptions: { expiresIn: '1h' },
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy ],
  exports: [AuthService]
})
export class AuthModule {}
