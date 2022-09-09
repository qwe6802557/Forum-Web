import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "../layout/page/page.component";

/**
 * 路由
 */
const childRouters: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: '', loadChildren: () => import('./social/social.module').then(m => m.SocialModule) },
]

/**
 * 布局路由勿动 布局规则 /page 头部布局；/layout/xxx 左侧布局 xxx表示配置菜单 /option 表示业务页面 例如:
 * /page/layout/sys/option 展示头部 左侧布局，左侧菜单为sys权限菜单列表
 * /layout/sys/option 只展示左侧布局，左侧菜单为sys 权限菜单列表
 * /option 无任何布局页面占满屏幕
 */
const routes: Routes = [
  {
    path: '',
    component: PageComponent, // 头部布局
    children: childRouters
  },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
