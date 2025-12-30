import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const leftDrawerOpen = ref(false)

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

  const setLeftDrawer = (value) => {
    leftDrawerOpen.value = value
  }

  return { leftDrawerOpen, toggleLeftDrawer, setLeftDrawer }
})
