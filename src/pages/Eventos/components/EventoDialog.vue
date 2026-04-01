<template>
  <q-dialog v-model="open" persistent>
    <q-card style="width: 700px; max-width: 95vw">
      <q-card-section class="row items-center justify-between bg-primary text-white">
        <div class="text-h6 text-weight-bold">
          {{ isEdit ? 'Editar Evento' : 'Nuevo Evento' }}
        </div>
        <q-btn dense flat icon="close" color="white" @click="close" />
      </q-card-section>

      <q-card-section class="q-pa-md">
        <q-form @submit.prevent="submit" class="q-gutter-y-md">

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <div class="text-weight-bold q-mb-xs">Nombre</div>
              <q-input
                filled
                v-model="form.nombre"
                placeholder="Nombre del evento"
                lazy-rules
                :rules="[val => !!val || 'El nombre es requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <div class="text-weight-bold q-mb-xs">Lugar</div>
              <q-input
                filled
                v-model="form.lugar"
                placeholder="Ubicación del evento"
                lazy-rules
                :rules="[val => !!val || 'El lugar es requerido']"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <div class="text-weight-bold q-mb-xs">Año</div>
              <q-input
                filled
                v-model="form.anio"
                placeholder="Ej. 2025"
                mask="####"
                lazy-rules
                :rules="[val => !!val || 'El año es requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <div class="text-weight-bold q-mb-xs">Fecha de Inicio</div>
              <q-input filled v-model="form.fecha_inicio" mask="####/##/##" placeholder="aaaa/mm/dd">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.fecha_inicio" mask="YYYY/MM/DD" :locale="myLocale">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Cerrar" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <div class="text-weight-bold q-mb-xs">Fecha de Finalización</div>
              <q-input filled v-model="form.fecha_fin" mask="####/##/##" placeholder="aaaa/mm/dd">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.fecha_fin" mask="YYYY/MM/DD" :locale="myLocale">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Cerrar" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>

          <div class="row justify-end q-gutter-sm q-mt-md">
            <q-btn flat label="Cancelar" color="primary" @click="close" />
            <q-btn flat label="Limpiar" color="primary" @click="resetForm" />
            <q-btn
              :label="isEdit ? 'Actualizar' : 'Guardar'"
              type="submit"
              color="primary"
              no-caps
            />
          </div>
        </q-form>
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

const myLocale = {
  days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
  daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
  firstDayOfWeek: 1
}

const form = ref({
  nombre: '',
  lugar: '',
  anio: '',
  fecha_inicio: '',
  fecha_fin: ''
})

watch(
  () => [props.modelValue, props.initialData],
  ([isOpen]) => {
    if (!isOpen) return
    if (props.initialData) {
      form.value = { ...props.initialData }
    } else {
      clearForm()
    }
  },
  { immediate: true }
)

function clearForm () {
  form.value = {
    nombre: '',
    lugar: '',
    anio: '',
    fecha_inicio: '',
    fecha_fin: ''
  }
}

function resetForm () {
  if (props.initialData) {
    form.value = { ...props.initialData }
  } else {
    clearForm()
  }
}

function submit () {
  emit('save', { ...form.value })
}

function close () {
  open.value = false
}
</script>
