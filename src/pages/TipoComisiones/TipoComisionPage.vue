<template>
  <q-page class="column q-pa-xl">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h3 text-weight-bolder">Tipo de Comisión</div>
      <q-btn color="primary" icon="add" label="Agregar" no-caps @click="openCreate" />
    </div>

    <q-separator spaced color="primary" />

    <div class="q-mt-md">
      <q-table
        flat
        bordered
        :rows="rows"
        :columns="columns"
        :filter="filter"
        :loading="loading"
        row-key="id"
        no-data-label="Ningún dato disponible en esta tabla"
        rows-per-page-label="Filas por página"
        no-results-label="No se encontraron coincidencias"
      >
        <template #top-right>
          <div class="row items-center">
            <span class="q-mr-sm">Buscar:</span>
            <q-input outlined dense debounce="300" v-model="filter" placeholder="Buscar...">
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>

        <template #body-cell-actions="props">
          <q-td class="text-center q-gutter-x-sm">
            <q-btn outline dense icon="edit" color="positive" @click="openEdit(props.row)" />
            <q-btn outline dense icon="delete" color="negative" @click="confirmDelete(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <TipoComisionDialog v-model="dialog" :initialData="selectedRow" @save="handleSave" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import TipoComisionDialog from './components/TipoComisionDialog.vue'

// Estado reactivo
const $q = useQuasar()
const filter = ref('')
const dialog = ref(false)
const selectedRow = ref(null)
const rows = ref([])
const loading = ref(false)

const columns = [
  { name: 'id', label: 'N°', field: 'id', align: 'left', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' },
]

// --- MÉTODOS DE LA API ---

// 1. Cargar datos (Cambiado a /tip_comisiones)
const getTiposComision = async () => {
  loading.value = true
  try {
    const response = await api.get('/tip_comisiones')
    rows.value = response.data.data !== undefined ? response.data.data : response.data
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Error al obtener datos del servidor' })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getTiposComision()
})

// 2. Guardar (Cambiado a /tip_comisiones)
const handleSave = async (payload) => {
  try {
    $q.loading.show({ message: 'Procesando...' })

    if (selectedRow.value?.id) {
      // EDITAR (PUT)
      await api.put(`/tip_comisiones/${selectedRow.value.id}`, payload)
      $q.notify({ type: 'positive', message: 'Registro actualizado con éxito' })
    } else {
      // CREAR (POST)
      await api.post('/tip_comisiones', payload)
      $q.notify({ type: 'positive', message: 'Nuevo registro guardado' })
    }

    dialog.value = false
    getTiposComision()
  } catch (error) {
    console.error(error)

    let errorMsg = 'No se pudo guardar la información'
    if (error.response?.data?.errors) {
      errorMsg = Object.values(error.response.data.errors)[0][0]
    } else if (error.response?.data?.message) {
      errorMsg = error.response.data.message
    }

    $q.notify({ type: 'negative', message: errorMsg })
  } finally {
    $q.loading.hide()
  }
}

// 3. Eliminar (Cambiado a /tip_comisiones)
const confirmDelete = (id) => {
  $q.dialog({
    title: 'Confirmar Eliminación',
    message: '¿Estás seguro de que deseas eliminar este tipo de comisión?',
    persistent: true,
    ok: { color: 'negative', label: 'Eliminar', flat: true },
    cancel: { label: 'Cancelar', flat: true }
  }).onOk(async () => {
    try {
      await api.delete(`/tip_comisiones/${id}`)
      $q.notify({ type: 'positive', message: 'Eliminado correctamente' })
      getTiposComision()
    } catch (error) {
      let errorMsg = 'Error al intentar eliminar'
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message
      }
      $q.notify({ type: 'negative', message: errorMsg })
    }
  })
}

function openCreate() {
  selectedRow.value = null
  dialog.value = true
}

function openEdit(row) {
  selectedRow.value = { ...row }
  dialog.value = true
}
</script>
