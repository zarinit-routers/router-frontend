<template>
    <div class="flex flex-col gap-2">
        <label class="text-base text-[#54505B] text-start">{{ label }}</label>
        <input
            class="p-5 text-white bg-[#37343D] rounded-lg outline-none invalid:text-[#B99209]"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            :disabled="disabled"
            @input="$emit('update:modelValue', $event.target.value)"
            :autocomplete="autocomplete" />
    </div>
</template>

<script setup>
defineProps({
    label: { type: String, required: true },
    autocomplete: String,
    modelValue: String,
    type: String,
    placeholder: String,
    disabled: Boolean,
});

defineEmits(["update:modelValue"]);
</script>
