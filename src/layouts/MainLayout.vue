<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="las la-bars" aria-label="Menu" @click="ui.toggleLeftDrawer" />

        <q-toolbar-title>CULTUREG</q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn 
            flat 
            dense 
            round 
            :icon="$q.dark.isActive ? 'las la-sun' : 'las la-moon'" 
            @click="$q.dark.toggle()"
          />
          
          <q-btn flat no-caps>
            <div class="row items-center no-wrap">
              <q-icon name="lar la-user" size="sm" class="q-mr-xs" />
              <span>{{ userName || 'Usuario' }}</span>
              <q-icon name="las la-angle-down" size="xs" class="q-ml-xs" />
            </div>
            
            <q-menu auto-close>
              <q-list style="min-width: 180px">
                <q-item clickable @click="logout">
                  <q-item-section avatar>
                    <q-icon name="las la-sign-out-alt" />
                  </q-item-section>
                  <q-item-section>Cerrar Sesión</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
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
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const ui = useUiStore()
const $q = useQuasar()
const router = useRouter()
const userName = ref('')

onMounted(() => {
  const userStr = localStorage.getItem('user')
  if (userStr) {
    try {
      const user = JSON.parse(userStr)
      if (user && user.name) {
        userName.value = user.name
      }
    } catch {
      // Ignorar errores de parseo
    }
  }
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  $q.notify({
    type: 'info',
    message: 'Sesión cerrada correctamente',
    position: 'top'
  })
  router.push('/login')
}

const linksList = [
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
  }
]
</script>
