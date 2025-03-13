<template>
    <label :for="id" :class="classLabel">{{ label }}</label>
    <input :class="classInput" :id="id" :type="type" :name="name" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script setup>
defineProps({
    id: String,
    label: { type: String, required: true },
    modelValue: String,
    classLabel: String,
    classInput: String,
    type: String,
    placeholder: String,
});

defineEmits(["update:modelValue"]);
</script>
