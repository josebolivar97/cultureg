<template>
  <q-page class="column q-pa-xl">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h3 text-weight-bolder">Eventos</div>
      <q-btn color="primary" label="Agregar" no-caps @click="openCreate" />
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
      >
        <template #top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar...">
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template #body-cell-actions="props">
          <q-td class="text-center">
            <q-btn dense flat icon="edit" color="grey-7" @click="openEdit(props.row)" />
            <q-btn dense flat icon="delete" color="negative" @click="deleteRow(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <EventoDialog
      v-model="dialog"
      :initialData="selectedRow"
      @save="handleSave"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import EventoDialog from './components/EventoDialog.vue'

const filter = ref('')
const dialog = ref(false)
const selectedRow = ref(null)

// Datos de ejemplo
const rows = ref([
  {
    id: 1,
    nombre: 'Aniversario Institucional',
    lugar: 'Auditorio Central',
    anio: '2025',
    fecha_inicio: '2025/11/04',
    fecha_finalizacion: '2025/11/05'
  }
])

// Columnas según image_c6f582.png
const columns = [
  { name: 'id', label: 'N°', field: 'id', align: 'left', sortable: true },
  { name: 'nombre', label: 'Nombre de Evento', field: 'nombre', align: 'left', sortable: true },
  { name: 'lugar', label: 'Lugar', field: 'lugar', align: 'left', sortable: true },
  { name: 'fecha_inicio', label: 'Fecha de Inicio', field: 'fecha_inicio', align: 'left', sortable: true },
  { name: 'fecha_finalizacion', label: 'Fecha de Finalización', field: 'fecha_finalizacion', align: 'left', sortable: true },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
]

function openCreate () {
  selectedRow.value = null
  dialog.value = true
}

function openEdit (row) {
  selectedRow.value = { ...row }
  dialog.value = true
}

function handleSave (payload) {
  if (selectedRow.value?.id) {
    const idx = rows.value.findIndex(r => r.id === selectedRow.value.id)
    if (idx !== -1) {
      rows.value[idx] = { ...rows.value[idx], ...payload }
    }
  } else {
    rows.value.push({
      id: rows.value.length + 1,
      ...payload
    })
  }
  dialog.value = false
}

function deleteRow (id) {
  rows.value = rows.value.filter(r => r.id !== id)
}
</script>
