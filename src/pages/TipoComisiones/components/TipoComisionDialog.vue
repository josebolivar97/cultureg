<template>
  <q-dialog v-model="open" persistent>
    <q-card style="width: 500px; max-width: 90vw">
      <q-card-section class="row items-center justify-between bg-primary text-white">
        <div class="text-h6 text-weight-bold">
          {{ isEdit ? 'Editar Tipo de Comisión' : 'Nuevo Tipo de Comisión' }}
        </div>
        <q-btn dense flat icon="close" color="white" @click="close" />
      </q-card-section>

      <q-card-section class="q-pa-md">
        <q-form @submit.prevent="submit" class="q-gutter-y-md">

          <div class="text-weight-bold q-mb-xs">Nombre</div>
          <q-input
            filled
            v-model="form.nombre"
            placeholder="Ingrese el nombre del tipo de comisión"
            lazy-rules
            :rules="[val => !!val || 'El nombre es obligatorio']"
          />

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

// Sincronización v-model
const open = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const isEdit = computed(() => !!props.initialData?.id)

// Estado del formulario
const form = ref({
  nombre: ''
})

// Vigilante para cargar/limpiar datos al abrir
watch(
  () => [props.modelValue, props.initialData],
  ([isOpen]) => {
    if (!isOpen) return
    if (props.initialData) {
      form.value.nombre = props.initialData.nombre || ''
    } else {
      form.value.nombre = ''
    }
  },
  { immediate: true }
)

// Envío del formulario
function submit () {
  emit('save', { nombre: form.value.nombre.trim() })
}

// Corrección del botón Limpiar
function resetForm () {
  if (props.initialData) {
    form.value.nombre = props.initialData.nombre || ''
  } else {
    form.value.nombre = ''
  }
}

function close () {
  open.value = false
}
</script>
