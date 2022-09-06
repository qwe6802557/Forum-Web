import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BcryptService } from "../../common/utils/bcrypt.service";
import { UsersModule } from "../users/users.module";
import { LocalStrategy } from "./providers/local.strategy";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY } from "../../constants/common.constants";
import { JwtStrategy } from "./providers/jwt.strategy";

@Module({
  imports: [ UsersModule, JwtModule, PassportModule.register({
    secret: JWT_KEY.secret,
    signOptions: { expiresIn: '1h' },
  })],
  providers: [AuthService, BcryptService, LocalStrategy, JwtStrategy ],
  exports: [AuthService]
})
export class AuthModule {}
