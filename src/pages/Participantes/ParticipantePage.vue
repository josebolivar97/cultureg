<template>
  <q-page class="column q-pa-xl">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h3 text-weight-bolder">Participantes</div>
      <q-btn color="primary" icon="add" label="Agregar" no-caps @click="openCreate" />
    </div>

    <q-separator spaced color="primary" />

    <div class="q-mt-md">
      <q-table
        flat
        bordered
        title="Listado de Participantes"
        :rows="rows"
        :columns="columns"
        :filter="filter"
        row-key="id"
        no-data-label="No hay datos"
        rows-per-page-label="Filas por página"
        no-results-label="No hay resultados"
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

    <ParticipantDialog v-model="dialog" :initialData="selectedRow" @save="handleSave" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import ParticipantDialog from './components/ParticipantDialog.vue'

const filter = ref('')
const dialog = ref(false)
const selectedRow = ref(null)

const rows = ref([
  {
    id: 1,
    dni: '12345678',
    nombres: 'Juan',
    apellido_paterno: 'Perez',
    apellido_materno: 'Gomez',
    celular: '999888777',
    email: 'juan@example.com',
    profesion: 'Ingeniero',
  },
])

const columns = [
  { name: 'id', label: 'N°', field: 'id', align: 'left', sortable: true },
  { name: 'dni', label: 'DNI', field: 'dni', align: 'left', sortable: true },
  { name: 'nombres', label: 'Nombres', field: 'nombres', align: 'left', sortable: true },
  {
    name: 'apellidos',
    label: 'Apellidos',
    field: (row) => `${row.apellido_paterno} ${row.apellido_materno}`,
    align: 'left',
  },
  { name: 'celular', label: 'Celular', field: 'celular', align: 'left' },
  { name: 'profesion', label: 'Profesión', field: 'profesion', align: 'left' },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' },
]

function openCreate() {
  selectedRow.value = null
  dialog.value = true
}

function openEdit(row) {
  selectedRow.value = { ...row }
  dialog.value = true
}

function handleSave(payload) {
  if (selectedRow.value?.id) {
    const idx = rows.value.findIndex((r) => r.id === selectedRow.value.id)
    if (idx !== -1) {
      rows.value[idx] = { ...selectedRow.value, ...payload }
    }
  } else {
    rows.value.push({
      id: rows.value.length + 1,
      ...payload,
    })
  }
  dialog.value = false
}

function deleteRow(id) {
  rows.value = rows.value.filter((r) => r.id !== id)
}
</script>
