<script setup>
import { useDhcpStore } from '../../stores/dhcpStore'
import { onMounted } from 'vue'

const dhcpStore = useDhcpStore()

onMounted(() => {
  dhcpStore.fetchStatus()
})
</script>

<template>
  <div>
    <p v-if="dhcpStore.loading">Загрузка...</p>
    <p v-else>DHCP {{ dhcpStore.enabled ? 'включён' : 'выключен' }}</p>
  </div>
</template>
