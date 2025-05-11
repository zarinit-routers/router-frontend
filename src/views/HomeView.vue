<script setup>
import OsInfo from "../components/OsInfo.vue";
import Timezone from "../components/Timezone.vue";
import NtpServers from "../components/NtpServers.vue";
import ModemList from "../components/ModemList.vue";
import FirewallSelect from "../components/FirewallSelect.vue";
import Journals from "../components/Journals.vue"
import Header from "../components/Header.vue";
import DeviceName from "../components/OS/DeviceName.vue"
import DeviceNetworkSpeed from "../components/OS/DeviceNetworkSpeed.vue"
import DeviceTraceroute from "../components/OS/DeviceTraceroute.vue"
import DHCP from "../components/DHCP/DHCP.vue";
import LAN from "../components/LAN.vue";
import WIFI from "../components/WIFI.vue";
import SSH from "../components/SSH.vue";
import Diagnostics from "../components/Diagnostics.vue";
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
      <Journals class="col-span-2" journalType="system" />
      <FirewallSelect />
      <DeviceName />
      <DeviceNetworkSpeed />
      <DeviceTraceroute />
     <DHCP />
     <LAN />
      <WIFI />
      <SSH />
      <Diagnostics />
    </div>
  </div>
</template>
