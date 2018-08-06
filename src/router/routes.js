import dashboard from "../pages/dashboard.vue";
import NotFoundView from "../components/404.vue";
import menuList from "../pages/sys/menu.vue";
import role from "../pages/sys/role.vue";
import resource from "../pages/sys/resource.vue";
import login from "../pages/login.vue";
import app from "../App.vue";
import sysUser from "../pages/sys/user.vue";
import userAdd from "../pages/sys/userAdd.vue";
import resetPwd from "../pages/resetPwd.vue";
import fitnessManage from "../pages/fitnessManage.vue";
import userManage from "../pages/userManage.vue";
import accountManage from "../pages/accountManage.vue";
// Routes
const routes = [
  {path: '/login', component: login},
  {
    path: '/test', component: app, children: [
      // {path: '*', component: NotFoundView}
    ]
  },
  {
    path: '', component: app, children: [
      {path: '/resetPwd', component: resetPwd},
      {path: '/index', component: dashboard},
      {path: '/sys/menuList', component: menuList},
      {path: '/sys/roleList', component: role},
      {path: '/sys/userList', component: sysUser},
      {path: '/sys/userAdd', component: userAdd},
      {path: '/sys/resource', component: resource},

      {path: '/test/2', component: userManage},
      {path: '/test/4', component: fitnessManage},
      {path: '/test/5', component: accountManage}
    ]
  },
  {path: '*', component: NotFoundView}
]


export default routes

