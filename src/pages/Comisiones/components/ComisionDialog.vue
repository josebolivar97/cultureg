<template>
  <q-dialog v-model="open" persistent>
    <q-card style="width: 520px; max-width: 90vw">
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-weight-bold">
          {{ isEdit ? 'Editar Comisión' : 'Nueva Comisión' }}
        </div>
        <q-btn dense flat icon="close" @click="close" />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="submit" @reset.prevent="resetForm" class="q-gutter-md">
          <q-input
            filled
            v-model="form.nombre"
            label="Nombre de la Comisión"
            hint="Ingrese el nombre"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Ingrese un nombre']"
          />

          <div class="row justify-end q-gutter-sm">
            <q-btn flat label="Cancelar" color="primary" @click="close" />
            <q-btn :label="isEdit ? 'Actualizar' : 'Guardar'" type="submit" color="primary" />
            <q-btn label="Limpiar" type="reset" color="primary" flat />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

/**
 * Props:
 * - modelValue: controla abrir/cerrar (v-model desde el padre)
 * - initialData: datos iniciales para editar (por ejemplo { id, nombre })
 */
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  initialData: { type: Object, default: null }
})

/**
 * Emits:
 * - update:modelValue: para que v-model funcione
 * - save: devuelve el payload { nombre } al padre
 */
const emit = defineEmits(['update:modelValue', 'save'])

/**
 * Computed "open" para usar v-model dentro del dialog
 * y que se sincronice con el padre.
 */
const open = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

/** Saber si estamos editando */
const isEdit = computed(() => !!props.initialData?.id)

/** Form local del modal */
const form = ref({
  nombre: ''
})

/**
 * Cada vez que se abre el modal o cambia initialData,
 * llenamos el form (en edit) o lo limpiamos (en create).
 */
watch(
  () => [props.modelValue, props.initialData],
  ([isOpen]) => {
    if (!isOpen) return

    if (props.initialData) {
      form.value.nombre = props.initialData.nombre ?? ''
    } else {
      form.value.nombre = ''
    }
  },
  { immediate: true }
)

function submit () {
  // Validación simple extra
  const nombre = form.value.nombre?.trim()
  if (!nombre) return

  // Emitimos al padre
  emit('save', { nombre })
}

function resetForm () {
  if (props.initialData) {
    form.value.nombre = props.initialData.nombre ?? ''
  } else {
    form.value.nombre = ''
  }
}

function close () {
  open.value = false
}
</script>
