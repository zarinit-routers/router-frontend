<template>
    <label :for="id" :class="classLabel">{{ label }}</label>
    <input :class="classInput" :id="id" :type="type" :name="name" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
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
