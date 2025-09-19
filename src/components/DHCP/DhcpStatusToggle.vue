<script setup>
import { onMounted } from 'vue'
import { Switch } from '@headlessui/vue'
import { useDhcpStore } from '../../stores/dhcp'

const store = useDhcpStore()

onMounted(() => {
  store.fetchStatus()
})
</script>

<template>
  <div class="flex items-center space-x-4 p-4 rounded-xl shadow space-y-4">

    <p class="w-[170px] mr-2 mb-0">DHCP-сервер:</p>
    <Switch
      :checked="store.enabled"
      @click="store.toggleDHCP"
      :disabled="store.loading"
      class="relative inline-flex h-6 w-11 mb-0 items-center rounded-full transition-colors duration-300 focus:outline-none"
      :class="store.enabled ? 'bg-green-600' : 'bg-gray-300'">
      <span
        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300"
        :class="store.enabled ? 'translate-x-6' : 'translate-x-1'"/>
    </Switch>

    <span class="text-sm ">
      DHCP <span :class="store.enabled ? 'text-green-600' : ''">
        {{ store.enabled ? 'включён' : 'выключен' }}
      </span>
    </span>
  </div>
</template>
