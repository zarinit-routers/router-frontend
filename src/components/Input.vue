<template>
  <div class="flex flex-col gap-2">
    <label class="form-label">{{ label }}</label>
    <input
      class="form-item"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
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
