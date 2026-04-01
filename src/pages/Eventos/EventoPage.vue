<template>
  <q-page class="column q-pa-xl">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h3 text-weight-bolder">Eventos</div>
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
        row-key="id"
        no-data-label="Ningún dato disponible en esta tabla"
        rows-per-page-label="Filas por página"
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
            <q-btn outline dense icon="delete" color="negative" @click="deleteRow(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <EventoDialog v-model="dialog" :initialData="selectedRow" @save="handleSave" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import EventoDialog from './components/EventoDialog.vue'

const $q = useQuasar()
const filter = ref('')
const dialog = ref(false)
const selectedRow = ref(null)
const loading = ref(false)
const rows = ref([])

const columns = [
  { name: 'id', label: 'N°', field: 'id', align: 'left', sortable: true },
  { name: 'nombre', label: 'Nombre de Evento', field: 'nombre', align: 'left', sortable: true },
  { name: 'lugar', label: 'Lugar', field: 'lugar', align: 'left', sortable: true },
  { name: 'fecha_inicio', label: 'Fecha de Inicio', field: 'fecha_inicio', align: 'left', sortable: true },
  { name: 'fecha_fin', label: 'Fecha de Finalización', field: 'fecha_fin', align: 'left', sortable: true },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
]

const getEventos = async () => {
  loading.value = true
  try {
    const response = await api.get('/eventos')
    rows.value = response.data.data !== undefined ? response.data.data : response.data
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Error al obtener datos' })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getEventos()
})

function openCreate() {
  selectedRow.value = null
  dialog.value = true
}

function openEdit(row) {
  selectedRow.value = { ...row }
  dialog.value = true
}

const handleSave = async (payload) => {
  try {
    $q.loading.show()
    if (selectedRow.value?.id) {
      await api.put(`/eventos/${selectedRow.value.id}`, payload)
    } else {
      await api.post('/eventos', payload)
    }
    dialog.value = false
    getEventos()
    $q.notify({ type: 'positive', message: 'Operación exitosa' })
  } catch (error) {
    console.error(error)
    $q.notify({ type: 'negative', message: 'Error al guardar' })
  } finally {
    $q.loading.hide()
  }
}

const deleteRow = (id) => {
  $q.dialog({
    title: 'Confirmar',
    message: '¿Eliminar registro?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await api.delete(`/eventos/${id}`)
      getEventos()
      $q.notify({ type: 'positive', message: 'Eliminado correctamente' })
    } catch (err) {
      console.error(err)
      $q.notify({ type: 'negative', message: 'Error al eliminar' })
    }
  })
}
</script>
