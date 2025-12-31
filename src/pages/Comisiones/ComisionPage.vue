<template>
  <q-page class="column q-pa-xl">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h3 text-weight-bolder">Comisión</div>
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

    <ComisionDialog
      v-model="dialog"
      :initialData="selectedRow"
      @save="handleSave"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import ComisionDialog from './components/ComisionDialog.vue'

const filter = ref('')
const dialog = ref(false)
const selectedRow = ref(null)

// Datos de ejemplo (Incluye el objeto o nombre del tipo de comisión)
const rows = ref([
  { id: 1, nombre: 'Comisión de Ética', tipo_comision: 'Permanente', tipo_comision_id: 1 },
  { id: 2, nombre: 'Comisión de Fiestas', tipo_comision: 'Especial', tipo_comision_id: 2 }
])

// Columnas según image_c6e6c3.png
const columns = [
  { name: 'id', label: 'N°', field: 'id', align: 'left', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
  { name: 'tipo_comision', label: 'Tipo de Comisión', field: 'tipo_comision', align: 'left', sortable: true },
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
  // payload trae { nombre, tipo_comision_id, tipo_comision_label }
  if (selectedRow.value?.id) {
    const idx = rows.value.findIndex(r => r.id === selectedRow.value.id)
    if (idx !== -1) {
      rows.value[idx] = {
        ...rows.value[idx],
        nombre: payload.nombre,
        tipo_comision_id: payload.tipo_comision_id,
        tipo_comision: payload.tipo_comision_label
      }
    }
  } else {
    rows.value.push({
      id: rows.value.length + 1,
      nombre: payload.nombre,
      tipo_comision_id: payload.tipo_comision_id,
      tipo_comision: payload.tipo_comision_label
    })
  }
  dialog.value = false
}

function deleteRow (id) {
  rows.value = rows.value.filter(r => r.id !== id)
}
</script>
