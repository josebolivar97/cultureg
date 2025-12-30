<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="las la-bars" aria-label="Menu" @click="ui.toggleLeftDrawer" />

        <q-toolbar-title>Quasar App</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="ui.leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Essential Links</q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import EssentialLink from 'components/EssentialLink.vue'
import { useUiStore } from 'src/stores/uiStore'

const ui = useUiStore()

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'las la-graduation-cap',
    link: 'https://quasar.dev',
  },
  {
    title: 'Usuarios',
    caption: '',
    icon: 'lar la-user',
    link: '/Usuarios',
  },
  {
    title: 'Roles',
    caption: '',
    icon: 'las la-users-cog',
    link: '/Roles',
  },
  {
    title: 'Participantes',
    caption: '',
    icon: 'las la-fist-raised',
    link: '/Participante',
  },
  {
    title: 'Registro',
    caption: '',
    icon: 'las la-clipboard-list',
    link: '/Registro',
  },
  {
    title: 'Evento',
    caption: '',
    icon: 'las la-calendar-day',
    link: '/Evento',
  },
  {
    title: 'Comisión',
    caption: '',
    icon: 'las la-folder-open',
    link: '/Comision',
  },
  {
    title: 'Tipo de Comisión',
    caption: '',
    icon: 'las la-sitemap',
    link: '/TipoComision',
  },
  {
    title: 'Mis Datos',
    caption: '',
    icon: 'las la-graduation-cap',
    link: 'https://quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'las la-shapes',
    link: 'https://awesome.quasar.dev',
  },
]
</script>
