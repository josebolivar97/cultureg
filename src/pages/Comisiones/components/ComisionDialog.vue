<template>
  <q-dialog v-model="open" persistent>
    <q-card style="width: 600px; max-width: 90vw">
      <q-card-section class="row items-center justify-between bg-primary text-white">
        <div class="text-h6 text-weight-bold">
          {{ isEdit ? 'Editar Comisión' : 'Nueva Comisión' }}
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
                placeholder="Nombre de la comisión"
                lazy-rules
                :rules="[val => !!val || 'El nombre es obligatorio']"
              />
            </div>

            <div class="col-12 col-md-6">
              <div class="text-weight-bold q-mb-xs">Tipo de Comisión</div>
              <q-select
                filled
                v-model="form.tipo_comision_obj"
                :options="tipoComisionesOptions"
                option-label="label"
                option-value="value"
                label="Seleccione un tipo"
                lazy-rules
                :rules="[val => !!val || 'Debe seleccionar un tipo']"
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
import { computed, ref, watch, onMounted } from 'vue'
import { api } from 'boot/axios'

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

const tipoComisionesOptions = ref([])

onMounted(async () => {
  try {
    const response = await api.get('/tip_comisiones')
    const data = response.data.data !== undefined ? response.data.data : response.data
    tipoComisionesOptions.value = data.map(item => ({
      label: item.nombre,
      value: item.id
    }))
  } catch (error) {
    console.error('Error al cargar tipos de comisión', error)
  }
})

const form = ref({
  nombre: '',
  tipo_comision_obj: null
})

watch(
  () => [props.modelValue, props.initialData, tipoComisionesOptions.value],
  ([isOpen]) => {
    if (!isOpen) return
    if (props.initialData) {
      form.value.nombre = props.initialData.nombre
      // Buscamos el objeto que coincida con el ID para el select
      form.value.tipo_comision_obj = tipoComisionesOptions.value.find(
        opt => opt.value === props.initialData.tip_comisions_id
      ) || null
    } else {
      clearForm()
    }
  },
  { immediate: true }
)

function clearForm () {
  form.value = {
    nombre: '',
    tipo_comision_obj: null
  }
}

function resetForm () {
  if (props.initialData) {
    form.value.nombre = props.initialData.nombre
    form.value.tipo_comision_obj = tipoComisionesOptions.value.find(
      opt => opt.value === props.initialData.tip_comisions_id
    ) || null
  } else {
    clearForm()
  }
}

function submit () {
  emit('save', {
    nombre: form.value.nombre.trim(),
    tip_comisions_id: form.value.tipo_comision_obj.value
  })
}

function close () {
  open.value = false
}
</script>
