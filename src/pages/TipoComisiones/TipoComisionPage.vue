<template>
  <q-page class="column q-pa-xl">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h3 text-weight-bolder">Tipo de Comisión</div>
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
        no-results-label="No se encontraron coincidencias"
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

    <TipoComisionDialog
      v-model="dialog"
      :initialData="selectedRow"
      @save="handleSave"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import TipoComisionDialog from './components/TipoComisionDialog.vue'

// Estado reactivo
const filter = ref('')
const dialog = ref(false)
const selectedRow = ref(null)

// Datos de ejemplo
const rows = ref([
  { id: 1, nombre: 'Permanente' },
  { id: 2, nombre: 'Especial' }
])

// Definición de columnas según image_c67cb0.png
const columns = [
  { name: 'id', label: 'N°', field: 'id', align: 'left', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
]

// Lógica de apertura
function openCreate () {
  selectedRow.value = null
  dialog.value = true
}

function openEdit (row) {
  selectedRow.value = { ...row }
  dialog.value = true
}

// Lógica de guardado
function handleSave (payload) {
  if (selectedRow.value?.id) {
    // Editar existente
    const idx = rows.value.findIndex(r => r.id === selectedRow.value.id)
    if (idx !== -1) {
      rows.value[idx].nombre = payload.nombre
    }
  } else {
    // Crear nuevo
    rows.value.push({
      id: rows.value.length + 1,
      nombre: payload.nombre
    })
  }
  dialog.value = false
}

// Lógica de eliminación
function deleteRow (id) {
  rows.value = rows.value.filter(r => r.id !== id)
}
</script>
