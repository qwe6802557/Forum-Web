import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptService {
    private readonly saltOrRounds = 10;
    // 加密
    async encryption (password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltOrRounds);
        const newPassword = await bcrypt.hash(password, salt);

        return newPassword;
    }
    // 解密
    async decryption (oldPassword: string, newPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(newPassword, oldPassword);

        return isMatch;
    }
}
