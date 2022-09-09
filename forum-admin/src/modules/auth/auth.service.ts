import { BadRequestException, Injectable} from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { BcryptService } from "../../common/utils/bcrypt.service";
import { JwtService } from '@nestjs/jwt';
import { JWT_KEY } from "../../constants/common.constants";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private bcryptProvider: BcryptService,
                private jwtService: JwtService) {}

    async validateUser(username: string, password: string ): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (!user) {
            return '用户不存在';
        }
        if (user && await this.bcryptProvider.decryption(user.password, password)) {
            const { password, ...result } = user;
            return result;
        }
        return '密码不正确';
    }

    async login(req) {
        const { user, session, body } = req;
        const payload = { username: user.username, sub: user.id };

        if (!body.verifyCode) {
            throw new BadRequestException('请输入验证码');
        }
        if (session.code.toLowerCase() !== body.verifyCode.toLowerCase()) {
            throw new BadRequestException('验证码不正确');
        }

        const {password, ...others} = await this.usersService.findOne(user.username);
        session.payload = {
            ...others
        };

        return {
            access_token: this.jwtService.sign(payload, {
                secret: JWT_KEY.secret
            })
        };
    }
}
