<template>
  <div
    class="flex flex-col bg-neutral-700 rounded-lg p-2 border-neutral-600 border"
    v-if="sim"
  >
    <div>
      <h3 class="text-xl">
        <span
          v-if="sim.properties['operator-name'] === '--'"
          class="text-[#B99209]"
          >No operator</span
        >
        <span v-else class="text-red-500">
          {{ sim.properties["operator-name"] }}
        </span>
      </h3>
      <div class="text-sm font-mono text-neutral-400">{{ simName }}</div>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
    >
      <div class="property-group" v-for="p in mapProps()">
        <div class="property-name">{{ p.name }}</div>
        <div
          v-if="typeof p.value == 'string'"
          class="font-mono text-neutral-400"
        >
          {{ p.value }}
        </div>
        <div
          v-if="typeof p.value == 'object'"
          v-for="v in p.value"
          class="font-mono text-neutral truncate"
        >
          {{ v }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
const props = defineProps({
  simName: {
    type: String,
    required: true,
  },
});

const sim = ref({ properties: { active: false } });

onMounted(() => {
  const param = encodeURIComponent(props.simName.split("/").pop());
  axios
    .post(`/api/sim/${param}`)
    .then((response) => {
      sim.value = response.data;
    })
    .catch((error) => console.log(error.message));
});
const mapProps = () => {
  return [
    { name: "Active", value: sim.value.properties.active },
    { name: "Removability", value: sim.value.properties.removability },
    { name: "ICCID", value: sim.value.properties.iccid },
    { name: "GID1", value: sim.value.properties.gid1 },
    { name: "GID2", value: sim.value.properties.gid2 },
    { name: "Sim type", value: sim.value.properties["sim-type"] },
    { name: "IMSI", value: sim.value.properties.imsi },
    {
      name: "Emergency numbers",
      value: sim.value.properties["emergency-numbers"],
    },
    {
      name: "Preferred networks",
      value: sim.value.properties["preferred-networks"],
    },
  ];
};
</script>

<style>
@import "../style.css";

.property-group {
  @apply flex flex-col gap-1;
}
.property-name {
  @apply font-bold;
}
.property-value {
  @apply font-mono text-neutral-300;
}
</style>
