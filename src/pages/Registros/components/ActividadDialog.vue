<template>
  <q-dialog v-model="open" persistent>
    <q-card style="width: 700px; max-width: 90vw">
      <q-card-section class="bg-primary text-white row items-center justify-between">
        <div class="text-h6 text-weight-bold">Registrar Actividad</div>
        <q-btn dense flat icon="close" color="white" @click="close" />
      </q-card-section>

      <q-card-section class="q-pa-md">
        <q-form @submit.prevent="save" class="q-gutter-y-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <div class="text-weight-bold q-mb-xs">Nombre de la Institución</div>
              <q-input
                filled
                v-model="form.institucion"
                placeholder="Ingrese institución"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>

            <div class="col-12 col-md-6">
              <div class="text-weight-bold q-mb-xs">Nombre de Reconocimiento</div>
              <q-input
                filled
                v-model="form.reconocimiento"
                placeholder="Ingrese reconocimiento"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>

            <div class="col-12 col-md-6">
              <div class="text-weight-bold q-mb-xs">Evento</div>
              <q-select
                filled
                v-model="form.evento"
                :options="['Aniversario 2025', 'Conferencia Regional', 'Taller Técnico']"
                label="Seleccione evento"
                :rules="[val => !!val || 'Debe seleccionar un evento']"
              />
            </div>

            <div class="col-12 col-md-6">
              <div class="text-weight-bold q-mb-xs">Agregar PDF del Certificado</div>
              <div class="row q-gutter-x-xs no-wrap">
                <q-file
                  filled
                  v-model="form.pdfFile"
                  label="Seleccionar archivo"
                  class="col"
                  accept=".pdf"
                >
                  <template v-slot:append>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
                <q-btn color="grey-3" text-color="black" label="Upload" unelevated style="height: 56px" />
              </div>
            </div>
          </div>

          <div class="row justify-end q-gutter-sm q-mt-md">
            <q-btn label="Regresar" color="teal" flat @click="close" no-caps />
            <q-btn label="Enviar" color="positive" type="submit" no-caps unelevated />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue' // CORRECCIÓN: Se eliminó 'watch' de aquí

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  participante: { type: Object, default: null }
})

const emit = defineEmits(['update:modelValue', 'save'])

// Sincronización del v-model con el padre
const open = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// Estado local del formulario
const form = ref({
  institucion: '',
  reconocimiento: '',
  evento: null,
  pdfFile: null
})

function save () {
  // Aquí enviamos los datos al padre
  emit('save', { ...form.value })
  resetForm()
}

function resetForm () {
  form.value = {
    institucion: '',
    reconocimiento: '',
    evento: null,
    pdfFile: null
  }
}

function close () {
  open.value = false
}
</script>
