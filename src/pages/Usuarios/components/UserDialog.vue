<template>
  <q-dialog v-model="open" persistent>
    <q-card style="width: 600px; max-width: 90vw">
      <q-card-section class="row items-center justify-between bg-primary text-white">
        <div class="text-h6 text-weight-bold">
          {{ isEdit ? 'Editar Usuario' : 'Nuevo Usuario' }}
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
                placeholder="Nombre completo"
                lazy-rules
                :rules="[val => !!val || 'El nombre es obligatorio']"
              />
            </div>
            <div class="col-12 col-md-6">
              <div class="text-weight-bold q-mb-xs">Email</div>
              <q-input
                filled
                v-model="form.email"
                placeholder="correo@ejemplo.com"
                type="email"
                lazy-rules
                :rules="[val => !!val || 'El email es obligatorio']"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12">
              <div class="text-weight-bold q-mb-xs">Rol</div>
              <q-select
                filled
                v-model="form.rol"
                :options="rolesOptions"
                label="Seleccione un rol"
                lazy-rules
                :rules="[val => !!val || 'Debe asignar un rol']"
              />
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

const rolesOptions = ['Administrador', 'Participante', 'Editor']

const form = ref({
  nombre: '',
  email: '',
  rol: null
})

// Sincronización de datos al abrir el modal
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
    email: '',
    rol: null
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
