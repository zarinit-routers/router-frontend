<script setup>
import OsInfo from "../components/OsInfo.vue";
import Timezone from "../components/Timezone.vue";
import NtpServers from "../components/NtpServers.vue";
import ModemList from "../components/ModemList.vue";
import FirewallSelect from "../components/FirewallSelect.vue";
</script>

<template>
  <Header></Header>
  <div class="mx-auto flex">
    <SideBar />
    <div class="grid grid-cols-1 xl:grid-cols-4">
      <OsInfo class="row-span-2" />
      <Timezone />
      <NtpServers />
      <ModemList />
      <Journals journalType="system" />
      <FirewallSelect />
    </div>
  </div>
</template>
