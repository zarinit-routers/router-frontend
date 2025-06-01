<script setup>
defineProps({
  label: { type: String, required: true },
  modelValue: [String, Number],
  options: {
    type: Array,
    required: true,
    validator: (options) =>
      options.every(
        (opt) => opt.value !== undefined && opt.label !== undefined,
      ),
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="form-label">{{ label }}</label>
    <select
      class="form-item"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="option in options" :key="option" :value="option.value">
        {{ option }}
      </option>
    </select>
  </div>
</template>
