<template>
  <q-page class="column q-pa-xl">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h3 text-weight-bolder">Registro de Participantes</div>
    </div>

    <q-separator spaced color="primary" />

    <div class="q-mt-md">
      <q-table
        flat
        bordered
        :rows="rows"
        :columns="columns"
        row-key="id"
        no-data-label="Ningún dato disponible en esta tabla"
      >
        <template #body-cell-actions="props">
          <q-td class="text-center q-gutter-x-sm">
            <q-btn
              dense
              flat
              icon="assignment_ind"
              color="teal"
              @click="verActividades(props.row)"
            >
              <q-tooltip>Ver actividades y perfil</q-tooltip>
            </q-btn>

            <q-btn
              dense
              flat
              icon="add_box"
              color="primary"
              @click="openAddActividad(props.row)"
            >
              <q-tooltip>Registrar actividad</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <ActividadDialog
      v-model="dialogActividad"
      :participante="selectedParticipante"
      @save="onActividadSaved"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ActividadDialog from './components/ActividadDialog.vue'

const router = useRouter()
const dialogActividad = ref(false)
const selectedParticipante = ref(null)

const rows = ref([
  { id: 1, nombre: 'JOSE HUMBERTO BOLIVAR BOLIVAR', dni: '76696586' }
])

const columns = [
  { name: 'id', label: 'N°', field: 'id', align: 'left', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
  { name: 'dni', label: 'Codigo', field: 'dni', align: 'left', sortable: true },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
]

function verActividades (participante) {
  // Redirigimos a la página de actividades pasando el ID o DNI
  router.push(`/registro/actividades/${participante.dni}`)
}

function openAddActividad (participante) {
  selectedParticipante.value = participante
  dialogActividad.value = true
}

function onActividadSaved (data) {
  console.log('Actividad registrada:', data)
  dialogActividad.value = false
}
</script>
