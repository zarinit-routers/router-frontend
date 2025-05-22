<template>
    <div class="bg-[#222228] p-5 border-1 border-solid border-[#363E4B]">
        <h1 class="mb-10 text-xl">
            DHCP
        </h1>
        <div class=" justify-between">

            <div class="">
                <DhcpStatusToggle />
            </div>
            <div class="">
                <DhcpLeases />
            </div>

            <DhcpRanges />

        </div>
        <DhcpStatic />
    </div>

</template>

<script setup>

import DhcpLeases from './DhcpLeases.vue';
import DhcpRanges from './DhcpRanges.vue';
import DhcpStatic from './DhcpStatic.vue';
import DhcpStatus from './DhcpStatus.vue';
import DhcpStatusToggle from './DhcpStatusToggle.vue';

</script>