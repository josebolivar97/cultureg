<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="window-height window-width row no-wrap">
        <div class="col-12 col-md-6 flex flex-center bg-white q-pa-md">
          <div class="full-width" style="max-width: 450px">
            <div class="text-h4 text-weight-bold q-mb-xl text-primary">
              CULTUREG
              <spam class="text-info">- Consejo Provincial de Cultura</spam>
            </div>

            <div class="text-h4 text-weight-bold q-mb-sm text-dark">Bienvenido de nuevo</div>
            <div class="text-grey-7 q-mb-xl">
              Por favor ingresa tus credenciales para continuar.
            </div>

            <q-form class="q-gutter-y-md">
              <q-input v-model="email" label="Usuario" outlined color="vue-green" bg-color="white">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>

              <q-input
                v-model="password"
                label="Contraseña"
                type="password"
                outlined
                color="vue-green"
                bg-color="white"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>

              <div class="row items-center justify-between q-mt-sm">
                <q-checkbox v-model="rememberMe" label="Recordarme" color="vue-green" dense />
              </div>

              <div class="row q-gutter-x-md q-mt-lg">
                <q-btn
                  unelevated
                  label="Iniciar Sesión"
                  class="col bg-vue-green text-white"
                  size="lg"
                  no-caps
                  @click="login"
                />
              </div>
            </q-form>
          </div>
        </div>

        <div class="col-md-6 gt-sm bg-grey-2 flex flex-center">
          <div class="text-center">
            <q-img
              src="src/assets/ESCUDO_PUNO2026.png"
              spinner-color="white"
              style="height: 400px; max-width: 500px"
              fit="contain"
            />

            <div class="text-h4 text-primary q-mt-md text-weight-medium">
              Municipalidad Provincial de Puno
            </div>
            <!-- <div class="text-grey-6 q-mt-sm">Sistema de Gestión Inteligente</div> -->
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios' // Importamos tu configuración de axios
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const login = async () => {
  // 1. Validación simple
  if (!email.value || !password.value) {
    $q.notify({
      type: 'warning',
      message: 'Por favor, ingresa tu usuario y contraseña',
      position: 'top'
    })
    return
  }

  // Mostrar cargando
  $q.loading.show({ message: 'Autenticando...' })

  try {
    // 2. Petición al endpoint de tu Laravel
    const response = await api.post('/login', {
      email: email.value,
      password: password.value
    })

    // 3. Guardar datos en LocalStorage
    const { access_token, user } = response.data
    localStorage.setItem('token', access_token)
    localStorage.setItem('user', JSON.stringify(user))

    $q.notify({
      type: 'positive',
      message: `Bienvenido(a), ${user.name}`,
      position: 'top'
    })

    // 4. Redirigir al Registro (o Dashboard)
    router.push('/Registro')

  } catch (error) {
    // Manejo de errores (Credenciales incorrectas)
    console.error(error)
    const errorMsg = error.response?.data?.errors?.email?.[0] || 'Error de conexión con el servidor'

    $q.notify({
      type: 'negative',
      message: errorMsg,
      position: 'top'
    })
  } finally {
    $q.loading.hide()
  }
}
</script>

<style lang="scss" scoped>
/* Definimos una clase personalizada para el color de Vue */
.bg-vue-green {
  background-color: #3759c7 !important;
}
.text-vue-green {
  color: #3759c7 !important;
}

/* Ajustes finos para que los inputs se vean similares al diseño */
:deep(.q-field--outlined .q-field__control:hover:before) {
  border-color: #3759c7;
}
</style>
