<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="form-label" for="">{{ label }}</label>
    <input :class="[ isTypeText ? 'w-full form-item' : '' ,classInput]" :type="type" :id="id" :placeholder="placeholder"
      :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getRandomId } from '../../composables/getRandomId'

const id = ref(getRandomId());

const props = defineProps({
  label: String,
  autocomplete: String,
  modelValue: String,
  type: String,
  placeholder: String,
  disabled: Boolean,
  classInput: Object
});

const textInputTypes = [
  "text",
  "password",
  "email",
  "search",
  "tel",
  "url",
  "number",
];

const isTypeText = computed(() => textInputTypes.includes(props.type))

defineEmits(["update:modelValue"]);
</script>
