<template>
  <q-page class="q-pa-md">
    <q-btn icon="las la-bars" label="Menú" @click="ui.toggleLeftDrawer()" />

    <div class="q-mt-md">
      Contenido de Usuarios
    </div>
  </q-page>
</template>

<script setup>
import { useUiStore } from 'src/stores/uiStore'
const ui = useUiStore()
</script>
