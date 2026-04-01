<template>
  <q-page class="column q-pa-xl">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h3 text-weight-bolder">Comisión</div>
      <q-btn
        color="primary"
        icon="add"
        label="Agregar"
        no-caps
        @click="openCreate"
      />
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
            <q-btn outline dense square icon="edit" color="positive" @click="openEdit(props.row)" />
            <q-btn outline dense square icon="delete" color="negative" @click="confirmDelete(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <ComisionDialog v-model="dialog" :initialData="selectedRow" @save="handleSave" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue' // onMounted ahora sí se usa abajo
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import ComisionDialog from './components/ComisionDialog.vue'

const $q = useQuasar()
const rows = ref([])
const filter = ref('')
const dialog = ref(false)
const selectedRow = ref(null)
const loading = ref(false)

const columns = [
  { name: 'id', label: 'N°', field: 'id', align: 'left', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
  {
    name: 'tipo_comision',
    label: 'Tipo de Comisión',
    field: row => row.tip_comision ? row.tip_comision.nombre : 'Sin tipo',
    align: 'left',
    sortable: true
  },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' },
]

const getComisiones = async () => {
  loading.value = true
  try {
    const response = await api.get('/comisiones')
    rows.value = response.data.data !== undefined ? response.data.data : response.data
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Error al obtener datos' })
  } finally {
    loading.value = false
  }
}

// Aquí se usa onMounted para que ESLint no de error
onMounted(() => {
  getComisiones()
})

const handleSave = async (payload) => {
  try {
    $q.loading.show()
    if (selectedRow.value?.id) {
      await api.put(`/comisiones/${selectedRow.value.id}`, payload)
    } else {
      await api.post('/comisiones', payload)
    }
    dialog.value = false
    getComisiones()
    $q.notify({ type: 'positive', message: 'Operación exitosa' })
  } catch (error) {
    console.error(error)
    $q.notify({ type: 'negative', message: 'Error al guardar' })
  } finally {
    $q.loading.hide()
  }
}

const confirmDelete = (id) => {
  $q.dialog({
    title: 'Confirmar',
    message: '¿Eliminar registro?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await api.delete(`/comisiones/${id}`)
    getComisiones()
  })
}

function openCreate() { selectedRow.value = null; dialog.value = true }
function openEdit(row) { selectedRow.value = { ...row }; dialog.value = true }
</script>
