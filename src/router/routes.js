const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'Participante', component: () => import('pages/ParticipantePage.vue') },
      { path: 'Evento', component: () => import('pages/EventoPage.vue') },
      { path: 'Registro', component: () => import('pages/RegistroPage.vue') },
      { path: 'Usuarios', component: () => import('pages/UsuariosPage.vue') },
      { path: 'Comision', component: () => import('pages/Comisiones/ComisionPage.vue') },
      { path: 'Roles', component: () => import('pages/RolesPage.vue') },
      { path: 'TipoComision', component: () => import('pages/TipoComisionPage.vue') }
    ],

  },
  {
    path: '/login',
    // Al ponerlo aquí afuera, usará el <q-layout> que pusimos dentro de LoginPage.vue
    // y ocupará toda la pantalla sin menús laterales.
    component: () => import('src/pages/loginPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
