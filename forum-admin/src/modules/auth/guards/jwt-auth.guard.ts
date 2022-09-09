import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ValidateRolesService } from "../../../common/utils/validate-roles.service";
import { IS_PUBLIC_KEY } from "../../../common/decorators/public.decorator";
import { IS_ADMIN_KEY } from "../../../common/decorators/admin.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector, private validateRolesService: ValidateRolesService) {
        super();
    }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.validateRolesService.getRolesRouterAccess(IS_PUBLIC_KEY, this.reflector, context) // 公共路由跳过验证
        const isAdminRole = this.validateRolesService.validateAdminRole(IS_ADMIN_KEY, this.reflector, context) // 管理员路由验证

        if (isPublic){
          return true;
        }
        if (!isAdminRole) {
            throw new UnauthorizedException("无权限访问");
        }

        return super.canActivate(context);
    }
}

