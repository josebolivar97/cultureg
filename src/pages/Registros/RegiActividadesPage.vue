<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="row items-center justify-between q-mb-lg">
      <div class="text-h5 text-weight-bold text-uppercase">Registro de Participaciones</div>
      <q-btn label="Regresar" color="teal" no-caps @click="$router.back()" />
    </div>

    <div class="row q-col-gutter-lg">
      <div class="col-12 col-md-4">
        <q-card flat bordered class="q-pa-md">
          <div class="text-center q-mb-md">
            <div class="text-h6 text-weight-bolder text-grey-9">{{ participante.nombre }}</div>
          </div>

          <q-list dense separator>
            <q-item v-for="(val, key) in camposPerfil" :key="key" class="q-py-sm">
              <q-item-section>
                <q-item-label class="text-weight-bold text-grey-8 text-uppercase" style="font-size: 0.8rem">
                  {{ key }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label class="text-primary text-weight-bold">{{ val }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <q-btn
            class="full-width q-mt-lg"
            color="negative"
            icon="picture_as_pdf"
            label="Descargar Informe PDF"
            no-caps
            unelevated
          />
        </q-card>
      </div>

      <div class="col-12 col-md-8">
        <q-card flat bordered class="q-pa-sm">
          <q-table
            flat
            title="Actividades"
            :rows="actividades"
            :columns="colActividades"
            :filter="filter"
            row-key="id"
            no-data-label="Ningún dato disponible en esta tabla"
          >
            <template #top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar:">
                <template #append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>

            <template #body-cell-pdf="props">
              <q-td class="text-center">
                <q-btn
                  flat
                  dense
                  icon="picture_as_pdf"
                  color="negative"
                  @click="verCertificado(props.row)"
                />
              </q-td>
            </template>

            <template #body-cell-actions="props">
              <q-td class="text-center q-gutter-x-xs">
                <q-btn
                  flat
                  dense
                  icon="edit"
                  color="grey-7"
                  @click="editarActividad(props.row)"
                />
                <q-btn
                  flat
                  dense
                  icon="delete"
                  color="negative"
                  @click="eliminarActividad(props.row.id)"
                />
              </q-td>
            </template>
          </q-table>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const filter = ref('')

// Datos del participante (Basado en image_d73c1d.png)
const participante = ref({
  nombre: 'JOSE HUMBERTO BOLIVAR BOLIVAR',
  dni: '76696586'
})

const camposPerfil = {
  'Dni': '76696586',
  'Comision': 'pruebacomision',
  'Tipo Comision': 'pruebatipcomosion',
  'Organización': 'MPP',
  'Fecha de Nacimiento': '25-08-1997',
  'Lugar de Nacimiento': 'Puno / Puno / Puno',
  'Profesión': 'INGENIERO DE SISTEMAS',
  'Residencia': 'Jr. 17 de Julio 253',
  'Correo Electronico': 'josebolivarbolivar97@gmail.com',
  'Celular': '923106592'
}

// Datos de ejemplo para la tabla de actividades
const actividades = ref([
  {
    id: 1,
    institucion: 'Municipalidad Puno',
    reconocimiento: 'Felicitación',
    lugar: 'Puno',
    fecha: '2025-12-30'
  }
])

const colActividades = [
  { name: 'id', label: 'N°', field: 'id', align: 'left', sortable: true },
  { name: 'institucion', label: 'Institución', field: 'institucion', align: 'left', sortable: true },
  { name: 'reconocimiento', label: 'Reconocimiento', field: 'reconocimiento', align: 'left' },
  { name: 'lugar', label: 'Lugar', field: 'lugar', align: 'left' },
  { name: 'fecha', label: 'Fecha', field: 'fecha', align: 'left' },
  { name: 'pdf', label: 'Pdf', field: 'pdf', align: 'center' },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
]

// Funciones para que el linter no dé error por no usar las variables
function editarActividad (row) {
  console.log('Editando actividad:', row)
}

function eliminarActividad (id) {
  actividades.value = actividades.value.filter(a => a.id !== id)
  console.log('Eliminado ID:', id)
}

function verCertificado (row) {
  console.log('Abriendo PDF de:', row.reconocimiento)
}
</script>
