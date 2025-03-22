<script setup>
import OsInfo from "../components/OsInfo.vue";
import Timezone from "../components/Timezone.vue";
import NtpServers from "../components/NtpServers.vue";
import ModemList from "../components/ModemList.vue";
import FirewallSelect from "../components/FirewallSelect.vue";
</script>

<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5">
      <OsInfo class="row-span-2" />
      <Timezone />
      <NtpServers />
      <ModemList class="row-span-2" />
      <FirewallSelect />
    </div>
  </div>
</template>
