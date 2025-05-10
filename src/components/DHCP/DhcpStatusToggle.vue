<script setup>
import { onMounted } from 'vue'
import { useDhcpStore } from '../../stores/dhcpStore'

const store = useDhcpStore()

// Получаем статус при монтировании компонента
onMounted(() => {
  store.fetchStatus()
})
</script>

<template>
  <div class="flex items-center space-x-4">
    <Switch
      :checked="store.enabled"
      @click="store.toggleDHCP"
      :disabled="store.loading"
      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
      :class="store.enabled ? 'bg-green-600' : 'bg-gray-300'"
    >
      <span
        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
        :class="store.enabled ? 'translate-x-6' : 'translate-x-1'"
      />
    </Switch>
   <!--  <span class="text-sm">
      DHCP {{ store.enabled ? 'включён' : 'выключен' }}
    </span> -->
  </div>
</template>
