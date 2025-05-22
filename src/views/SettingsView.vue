<script setup>
import WIFI from "../components/WIFI.vue";
import Diagnostics from "../components/Diagnostics.vue";
import DHCP from "../components/DHCP/DHCP.vue";
import LAN from "../components/LAN.vue";
import Journals from "../components/Journals.vue";
import DeviceTraceroute from "../components/OS/DeviceTraceroute.vue";
import Timezone from "../components/Timezone.vue";
import NtpServers from "../components/NtpServers.vue";
import FirewallSelect from "../components/FirewallSelect.vue";
</script>
<template>
  <div class="flex flex-col lg:flex-row justify-between gap-x-8">
    <div class="flex-1">
      <div class="flex flex-col gap-2">
        <WIFI class="w-full"/>
        <Diagnostics class="w-full"/>
        <DeviceTraceroute class="w-full"/>
        <NtpServers class="w-full"/>
        <LAN class="w-full"/>
      </div>
    </div>
    <div class="flex-1">
      <div class="flex flex-col gap-2">
        <DHCP class="w-full"/>
        <Journals class="w-full"/>
        <FirewallSelect class="w-full"/>
      </div>
    </div>
  </div>
</template>
