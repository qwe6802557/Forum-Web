import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { Reflector } from "@nestjs/core";

@Injectable()
export class ValidateRolesService {
    constructor () {}
    // 获取角色是否为指定路由权限
    getRolesRouterAccess (key: string, reflector: Reflector, context: ExecutionContext): boolean {
        const routerAccess = reflector.getAllAndOverride<boolean>(key, [
            context.getHandler(),
            context.getClass(),
        ]);

        return routerAccess;
    }
    // 验证管理员权限
    validateAdminRole (key: string, reflector: Reflector, context: ExecutionContext): boolean {
        let request: any;
        let payload: any;
        const result = this.getRolesRouterAccess(key, reflector, context);

        if (result) {
            request = context.switchToHttp().getRequest();
            payload = request.session.payload;
            if (!payload || payload.identity !== "1") {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
}
