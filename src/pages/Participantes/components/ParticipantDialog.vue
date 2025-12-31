<template>
  <q-dialog v-model="open" persistent full-width>
    <q-card style="max-width: 900px; margin: auto;">
      <q-card-section class="bg-primary text-white row items-center justify-between">
        <div class="text-h6 text-weight-bold">
          {{ isEdit ? 'Editar Participante' : 'Nuevo Participante' }}
        </div>
        <q-btn dense flat icon="close" color="white" @click="close" />
      </q-card-section>

      <q-card-section class="q-pa-none">
        <q-stepper
          v-model="step"
          ref="stepper"
          color="primary"
          animated
          header-nav
          flat
        >
          <q-step
            :name="1"
            title="Datos Personales"
            icon="person"
            :done="step > 1"
          >
            <q-form ref="formStep1" class="q-gutter-y-md">
              <div class="text-subtitle1 text-center text-weight-bold text-uppercase q-mb-md">Datos Personales</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-4">
                  <q-input filled v-model="form.dni" label="DNI" mask="########" :rules="[val => !!val || 'El DNI es obligatorio']" />
                </div>
                <div class="col-12 col-md-2">
                  <q-btn color="primary" icon="search" class="full-width" style="height: 56px" @click="searchDni" />
                </div>
                <div class="col-12 col-md-6"></div>

                <div class="col-12 col-md-4">
                  <q-input filled v-model="form.nombres" label="Nombres" :rules="[val => !!val || 'Campo requerido']" />
                </div>
                <div class="col-12 col-md-4">
                  <q-input filled v-model="form.apellido_paterno" label="Apellido Paterno" :rules="[val => !!val || 'Campo requerido']" />
                </div>
                <div class="col-12 col-md-4">
                  <q-input filled v-model="form.apellido_materno" label="Apellido Materno" :rules="[val => !!val || 'Campo requerido']" />
                </div>
                <div class="col-12 col-md-4">
                  <q-input filled v-model="form.fecha_nacimiento" label="Fecha de Nacimiento" mask="####-##-##">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="form.fecha_nacimiento" mask="YYYY-MM-DD">
                            <div class="row items-center justify-end"><q-btn v-close-popup label="Cerrar" color="primary" flat /></div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-4">
                  <q-input filled v-model="form.email" label="Email" type="email" />
                </div>
                <div class="col-12 col-md-4">
                  <q-input filled v-model="form.celular" label="Celular" mask="#########" />
                </div>
              </div>
            </q-form>
          </q-step>

          <q-step
            :name="2"
            title="Nacimiento y Residencia"
            icon="place"
            :done="step > 2"
          >
            <q-form ref="formStep2" class="q-gutter-y-md">
              <div class="text-subtitle1 text-center text-weight-bold text-uppercase q-mb-md">Lugar de Nacimiento y Residencia</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-4">
                  <q-input filled v-model="form.departamento" label="Departamento" :rules="[val => !!val || 'Campo requerido']" />
                </div>
                <div class="col-12 col-md-4">
                  <q-input filled v-model="form.provincia" label="Provincia" :rules="[val => !!val || 'Campo requerido']" />
                </div>
                <div class="col-12 col-md-4">
                  <q-input filled v-model="form.distrito" label="Distrito" :rules="[val => !!val || 'Campo requerido']" />
                </div>
                <div class="col-4">
                  <q-input filled v-model="form.lugar_residencia" label="Lugar de Residencia (Dirección)" :rules="[val => !!val || 'Campo requerido']" />
                </div>
                <div class="col-12 col-md-8"></div>

              </div>
            </q-form>
          </q-step>

          <q-step
            :name="3"
            title="Información Profesional"
            icon="work"
          >
            <q-form ref="formStep3" class="q-gutter-y-md">
              <div class="text-subtitle1 text-center text-weight-bold text-uppercase q-mb-md">Información Profesional</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input filled v-model="form.profesion" label="Profesión" :rules="[val => !!val || 'Campo requerido']" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input filled v-model="form.organizacion" label="Organización/Institución" :rules="[val => !!val || 'Campo requerido']" />
                </div>
                <div class="col-12 col-md-6">
                  <q-select
                    filled
                    v-model="form.comision"
                    :options="['Comisión Organizadora', 'Comisión Técnica', 'Comisión de Logística']"
                    label="Comisión"
                    :rules="[val => !!val || 'Seleccione una comisión']"
                  />
                </div>
              </div>
            </q-form>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation class="row justify-end q-gutter-sm q-pa-md">
              <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Regresar" />
              <q-btn flat color="primary" @click="resetForm" label="Limpiar" />
              <q-btn @click="handleNext" color="primary" :label="step === 3 ? (isEdit ? 'Actualizar' : 'Guardar') : 'Continuar'" />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  initialData: { type: Object, default: null }
})

const emit = defineEmits(['update:modelValue', 'save'])

const open = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const isEdit = computed(() => !!props.initialData?.id)
const step = ref(1)

// Referencias de los formularios para validación
const formStep1 = ref(null)
const formStep2 = ref(null)
const formStep3 = ref(null)

const form = ref({
  dni: '', nombres: '', apellido_paterno: '', apellido_materno: '',
  fecha_nacimiento: '', email: '', celular: '',
  departamento: '', provincia: '', distrito: '', lugar_residencia: '',
  profesion: '', organizacion: '', comision: null
})

watch(() => [props.modelValue, props.initialData], ([isOpen]) => {
  if (!isOpen) return
  step.value = 1 // Siempre iniciar en el paso 1
  if (props.initialData) {
    form.value = { ...props.initialData }
  } else {
    clearFields()
  }
}, { immediate: true })

async function handleNext () {
  let isValid = false

  if (step.value === 1) isValid = await formStep1.value.validate()
  else if (step.value === 2) isValid = await formStep2.value.validate()
  else if (step.value === 3) isValid = await formStep3.value.validate()

  if (isValid) {
    if (step.value < 3) {
      step.value++
    } else {
      submit()
    }
  }
}

function submit () {
  emit('save', { ...form.value })
}

function searchDni () {
  console.log('Buscando DNI...')
}

function clearFields () {
  form.value = {
    dni: '', nombres: '', apellido_paterno: '', apellido_materno: '',
    fecha_nacimiento: '', email: '', celular: '',
    departamento: '', provincia: '', distrito: '', lugar_residencia: '',
    profesion: '', organizacion: '', comision: null
  }
}

function resetForm () {
  if (props.initialData) form.value = { ...props.initialData }
  else clearFields()
}

function close () {
  open.value = false
}
</script>
