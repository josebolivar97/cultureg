import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

// Creamos la instancia apuntando a tu Laravel en Laragon
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
})

export default defineBoot(({ app }) => {
  // CONFIGURACIÓN DINÁMICA DE SEGURIDAD
  api.interceptors.request.use((config) => {
    // Intentamos recuperar el token que guardamos en el loginPage.vue
    const token = localStorage.getItem('token')

    // Si el token existe en el navegador del usuario, lo adjuntamos a la petición
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }, (error) => {
    // Manejo de errores de petición
    return Promise.reject(error)
  })

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
