const routes = [
  {
    path: '/',
    component: () => import('../layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'loginDefaut', component: () => import('pages/Login.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', name: 'register', component: () => import('pages/Register.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('pages/ForgotPassword.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/ResetPassword.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),

    children: [
      { path: 'me', name: 'me', component: () => import('src/pages/Me.vue') },
      { path: 'diaferiado', name: 'diaferiado', component: () => import('pages/feriados/DiaFeriado.vue') }

      // { path: 'me', name: 'me', component: () => import('../pages/IndexPage.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue')
  }
]

export default routes
