import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    name: 'portfolio',
    component: () => import('@/views/portfolio/PortfolioView.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/portfolio/AllProjectsView.vue'),
    meta: { title: 'Projects' }
  },
  {
    path: '/certificates',
    name: 'certificates',
    component: () => import('@/views/portfolio/AllCertificatesView.vue'),
    meta: { title: 'Certificates' }
  },
  {
    path: '/dashboard',
    component: () => import('@/components/layout/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'dashboard', component: () => import('@/views/dashboard/DashboardView.vue') },
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/users/UsersListView.vue'),
        meta: { permission: 'users:read', title: 'Users' }
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/roles/RolesListView.vue'),
        meta: { permission: 'roles:read', title: 'Roles & Permissions' }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/settings/ProfileView.vue'),
        meta: { title: 'Profile & Security' }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('@/components/layout/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'admin-overview',
        component: () => import('@/views/admin/AdminOverviewView.vue'),
        meta: { permission: 'portfolio:manage', title: 'Portfolio Admin' }
      },
      {
        path: ':resource',
        name: 'admin-resource',
        component: () => import('@/views/admin/ResourceCrudView.vue'),
        meta: { permission: 'portfolio:manage', title: 'Manage Portfolio' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: { guest: true }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPasswordView.vue'),
    meta: { guest: true }
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/auth/ResetPasswordView.vue'),
    meta: { guest: true }
  },
  {
    path: '/403',
    name: 'forbidden',
    component: () => import('@/views/errors/ForbiddenView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/errors/NotFoundView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 })
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  await auth.init();

  if (to.matched.some((record) => record.meta.requiresAuth) && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  if (to.meta.guest && auth.isAuthenticated) {
    return { name: 'dashboard' };
  }

  if (to.meta.permission && !auth.can(to.meta.permission)) {
    return { name: 'forbidden' };
  }

  return true;
});

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · Portfolio` : 'Portfolio';
});

export default router;
