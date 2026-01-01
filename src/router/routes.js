const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'Participante', component: () => import('src/pages/Participantes/ParticipantePage.vue') },
      { path: 'Evento', component: () => import('src/pages/Eventos/EventoPage.vue') },
      { path: 'Registro', component: () => import('src/pages/Registros/RegistroPage.vue') },
      { path: 'Usuarios', component: () => import('src/pages/Usuarios/UsuariosPage.vue') },
      { path: 'Comision', component: () => import('pages/Comisiones/ComisionPage.vue') },
      { path: 'Roles', component: () => import('src/pages/Roles/RolesPage.vue') },
      { path: 'Actividad', component: () => import('src/pages/Registros/RegiActividadesPage.vue') },
      { path: 'TipoComision', component: () => import('src/pages/TipoComisiones/TipoComisionPage.vue') }
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
