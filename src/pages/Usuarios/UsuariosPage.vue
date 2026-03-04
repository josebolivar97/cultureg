<template>
  <q-page class="column q-pa-xl">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h3 text-weight-bolder">Usuarios</div>
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
            <q-input outlined dense debounce="300" v-model="filter" placeholder="Buscar usuario...">
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

    <UserDialog v-model="dialog" :initialData="selectedRow" @save="handleSave" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import UserDialog from './components/UserDialog.vue'

const filter = ref('')
const dialog = ref(false)
const selectedRow = ref(null)

// Datos de ejemplo basados en tu configuración
const rows = ref([
  {
    id: 1,
    nombre: 'JOSE HUMBERTO BOLIVAR BOLIVAR',
    email: 'josebolivarbolivar97@gmail.com',
    rol: 'Administrador',
  },
  { id: 2, nombre: 'Test User', email: 'test@example.com', rol: 'Participante' },
  { id: 3, nombre: 'Test User', email: 'administrador@example.com', rol: 'Administrador' },
])

const columns = [
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
  { name: 'email', label: 'Email', field: 'email', align: 'left', sortable: true },
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
      id: Date.now(),
      ...payload,
    })
  }
  dialog.value = false
}

function deleteRow(id) {
  rows.value = rows.value.filter((r) => r.id !== id)
}
</script>
