<template>
    <label :for="id" :class="classLabel">{{ label }}</label>
    <select
      :id="id"
      :name="name"
      :class="classSelect"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </template>
  
  <script setup>
  defineProps({
    id: String,
    label: { type: String, required: true },
    modelValue: [String, Number], 
    classLabel: String,
    classSelect: String,
    name: String,
    options: { 
      type: Array, 
      required: true,
      validator: (options) => options.every(opt => opt.value !== undefined && opt.label !== undefined)
    }
  });
  
  defineEmits(["update:modelValue"]);
  </script>
  