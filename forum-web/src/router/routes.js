/**
 * @description 路由
 * @author lilin
 * @time 2020/07/24
 */

 // 扩展路由加载

// 相同路由对象

// 合并路由对象
export default [
  {
    path: '/',
    name: 'Home',
    desc: '论坛首页',
    redirect: '/home',
    component: () => import(`@/views/layout/layout`),
    children: [
      {
        path: 'home',
        name: 'home',
        desc: '论坛首页',
        component: () => import(`@/views/home/Home`)
      },
      {
        path: 'publishResults',
        name: 'publishResults',
        desc: '发布成果',
        component: () => import(`@/views/home/PublishResults`)
      },
      {
        path: 'myPost',
        name: 'myPost',
        desc: '我的帖子',
        component: () => import(`@/views/post/MyEssay`)
      },
      {
        path: 'post',
        name: 'post',
        desc: '帖子列表',
        component: () => import(`@/views/post/Essay`)
      },
      {
        path: 'collection',
        name: 'collection',
        desc: '我的收藏',
        component: () => import(`@/views/post/Collection`)
      },
      {
        path: 'postDetail',
        name: 'postDetail',
        desc: '成果详情',
        component: () => import(`@/views/post/Detail`)
      },
      {
        path: 'detail',
        name: 'detail',
        desc: '成果详情',
        component: () => import(`@/views/post/EssayDetails`)
      },
      {
        path: 'leaderboard',
        name: 'leaderboard',
        desc: '帖子排行榜',
        component: () => import(`@/views/post/leaderboard`)
      },
      {
        path: 'draft',
        name: 'draft',
        desc: '草稿',
        component: () => import(`@/views/draft/Drafts`)
      },
      {
        path: 'question-list',
        name: 'questionList',
        desc: '问题列表',
        component: () => import(`@/views/question/questionList`)
      },
      {
        path: 'myQuestionList',
        name: 'myQuestionList',
        desc: '我的问答',
        component: () => import(`@/views/question/myQuestionList`)
      },
      {
        path: 'publishQuestion',
        name: 'publishQuestion',
        desc: '发布问题',
        component: () => import(`@/views/question/publishQuestion`)
      },
      {
        path: 'publishDetail',
        name: 'publishDetail',
        desc: '问题详情',
        component: () => import(`@/views/question/questionDetail`)
      },
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    desc: '后台管理页面',
    redirect: '/admin/banner',
    component: () => import(`@/views/admin/layout/layout`),
    children: [
      {
        path: 'banner',
        name: 'banner',
        desc: '轮播图配置',
        component: () => import(`@/views/admin/banner/banner`)
      },
      {
        path: 'role',
        name: 'role',
        desc: '管理员配置',
        component: () => import(`@/views/admin/role/role`)
      },
      {
        path: 'major',
        name: 'major',
        desc: '专业配置',
        component: () => import(`@/views/admin/major/major`)
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { requireAuth: true }
  },
  {
    path: '/404',
    name: '404errorReport',
    desc: '404报错页面',
    component: () => import('@/views/404')
  },
  {
    path: '/401',
    name: '401errorReport',
    desc: '401报错页面',
    component: () => import('@/views/403')
  },
  {
    path: '*',
    name: 'index',
    redirect:'/networkManagement/index'
  }
]
