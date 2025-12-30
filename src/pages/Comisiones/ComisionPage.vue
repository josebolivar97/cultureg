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
        title="Comisiones"
        :rows="rows"
        :columns="columns"
        :filter="filter"
        row-key="id"
        no-data-label="No hay datos"
        no-results-label="No hay resultados"
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
            <q-btn dense flat icon="edit" @click="openEdit(props.row)" />
            <q-btn dense flat icon="delete" @click="deleteRow(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- Modal como componente aparte -->
    <CommissionDialog
      v-model="dialog"
      :initialData="selectedRow"
      @save="handleSave"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import CommissionDialog from 'src/pages/Comisiones/components/ComisionDialog.vue'

const filter = ref('')

// Datos de ejemplo (luego vendrán de Laravel)
const rows = ref([
  { id: 1, nombre: 'Comisión A' },
  { id: 2, nombre: 'Comisión B' }
])

const columns = [
  { name: 'id', label: 'N°', field: 'id', align: 'left', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
]

// Control del modal
const dialog = ref(false)

// Fila seleccionada (si es null => crear, si tiene id => editar)
const selectedRow = ref(null)

function openCreate () {
  selectedRow.value = null
  dialog.value = true
}

function openEdit (row) {
  selectedRow.value = { ...row } // copiamos para no mutar directo
  dialog.value = true
}

function handleSave (payload) {
  // payload = { nombre }

  if (selectedRow.value?.id) {
    // EDITAR
    const idx = rows.value.findIndex(r => r.id === selectedRow.value.id)
    if (idx !== -1) {
      rows.value[idx].nombre = payload.nombre
    }
  } else {
    // CREAR
    rows.value.push({
      id: Date.now(),
      nombre: payload.nombre
    })
  }

  dialog.value = false
}

function deleteRow (id) {
  rows.value = rows.value.filter(r => r.id !== id)
}
</script>
