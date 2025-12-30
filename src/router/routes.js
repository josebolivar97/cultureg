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
      { path: 'Comision', component: () => import('pages/ComisionPage.vue') },
      { path: 'Roles', component: () => import('pages/RolesPage.vue') },
      { path: 'TipoComision', component: () => import('pages/TipoComisionPage.vue') }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
