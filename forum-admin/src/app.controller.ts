import {Controller, Post, Request, UseGuards, Get, Session, Res } from '@nestjs/common';
import { LocalAuthGuard } from "./modules/auth/guards/local-auth.guard";
import { AuthService} from "./modules/auth/auth.service";
import { Public } from "./common/decorators/public.decorator";
import { SvgCaptchaService } from "./common/utils/svg-capcha.service";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly svgCaptchaService: SvgCaptchaService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req);
  }
  @Public()
  @Get('svg-captcha')
  async getSvgCaptcha (@Session() session, @Res() res) {
    const svgCaptcha = await this.svgCaptchaService.createSvg(); //创建验证码
    session.code = svgCaptcha.text; //使用session保存验证，用于登陆时验证
    res.type('image/svg+xml'); //指定返回的类型
    res.send(svgCaptcha.data); //给页面返回一张图片
  }
}
