import { SetMetadata } from "@nestjs/common";

/**
 * 自定义公共装饰器
 */
export const IS_ADMIN_KEY = "isAdmin";

export const Admin = () => SetMetadata(IS_ADMIN_KEY, true);
