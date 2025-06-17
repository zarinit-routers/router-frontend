<template>
  <div class="">
    <h2 class="text-xl font-semibold text-center">Диагностика сети</h2>

    <div class="flex justify-center space-x-4 my-4">
      <Button
        @click="activeModal = 'ping'"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Ping
      </Button>
      <Button
        @click="activeModal = 'traceroute'"
        class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
      >
        Traceroute
      </Button>
      <Button
        @click="activeModal = 'nslookup'"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        DNS
      </Button>
    </div>

    <component :is="modalComponent" v-if="activeModal" @close="activeModal = null" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import PingModal from './PingModal.vue';
import TracerouteModal from './TracerouteModal.vue';
import NslookupModal from './DnsModal.vue';
import Button from '../baseComponents/Button.vue';

const activeModal = ref(null);

const modalComponent = computed(() => {
  switch (activeModal.value) {
    case 'ping':
      return PingModal;
    case 'traceroute':
      return TracerouteModal;
    case 'nslookup':
      return NslookupModal;
    default:
      return null;
  }
});
</script>
