import { SetMetadata } from "@nestjs/common";

/**
 * 自定义公共装饰器
 */
export const IS_PUBLIC_KEY = "isPublic";

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
