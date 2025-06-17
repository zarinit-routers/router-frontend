<script setup>
import WIFI from "../components/WIFI.vue";
import Diagnostics from "../components/diagnostics/Diagnostics.vue";
import DHCP from "../components/DHCP/DHCP.vue";
import Journals from "../components/Journals.vue";
import NtpServers from "../components/NtpServers.vue";
import FirewallSelect from "../components/FirewallSelect.vue";
import Timezone from "../components/Timezone.vue";
import SSH from "../components/SSH.vue";
import ChangePassword from "../components/ChangePassword.vue";

const componentsCol1 = [
  { component: WIFI, unstable: false },
  { component: Diagnostics },
  { component: NtpServers },
  { component: Timezone },
];
const componentsCol2 = [
  { component: DHCP, unstable: true },
  { component: Journals },
  { component: FirewallSelect, unstable: true },
  { component: SSH, unstable: true },
  { component: ChangePassword }, 
];
</script>
<template>
  <div class="flex flex-col lg:flex-row justify-between gap-2">
    <div
      v-for="column in [componentsCol1, componentsCol2]"
      class="flex flex-col gap-2 lg:w-1/2"
    >
      <div
        v-for="c in column"
        class="w-full flex flex-col p-6 bg-[#222228] space-y-6 border-1 border-solid border-[#363E4B]"
        :class="c.unstable ? 'border-orange-400' : ''"
      >
        <div
          v-if="c.unstable"
          class="p-4 bg-orange-500 flex items-center gap-4 border-2 border-orange-400"
        >
          <i class="fas fa-triangle-exclamation text-xl"></i>
          <div>
            Этот компонент помечен как нестабильный, не рекомендуется его
            использовать.
          </div>
        </div>
        <component :is="c.component" class="w-full" />
      </div>
    </div>
  </div>
</template>
