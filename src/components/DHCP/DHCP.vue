<template>
    <div>
        <DhcpStatus />
        <DhcpStatusToggle />
        <DhcpLeases />
        <DhcpRanges />
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