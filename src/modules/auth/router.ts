import type { RouteRecordRaw } from 'vue-router';

/**
 * Route names: Add module name as prefix to make them unique
 */
export enum routeNames {
  AUTH_ROOT = 'AUTH_ROOT',
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_SIGNUP = 'AUTH_SIGNUP',
}

const AuthLayout = () => import('./presentation/layouts/AuthLayout.vue');
const SignupView = () => import('./presentation/views/SignupView.vue');
const LoginView = () => import('./presentation/views/LoginView.vue');

export const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: routeNames.AUTH_ROOT,
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: routeNames.AUTH_LOGIN,
        component: LoginView,
      },
      {
        path: 'signup',
        name: routeNames.AUTH_SIGNUP,
        component: SignupView,
      },
    ],
  },
];
