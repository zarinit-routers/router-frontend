<template>
  <h1 class="mb-10 text-xl">DHCP</h1>
  <div class="justify-between">
    <div class="">
      <DhcpStatusToggle />
    </div>
    <div class="">
      <DhcpLeases />
    </div>

    <DhcpRanges />
  </div>
  <DhcpStatic />
</template>

<script setup>
import DhcpLeases from "./DhcpLeases.vue";
import DhcpRanges from "./DhcpRanges.vue";
import DhcpStatic from "./DhcpStatic.vue";
import DhcpStatusToggle from "./DhcpStatusToggle.vue";
</script>
