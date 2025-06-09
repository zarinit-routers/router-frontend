<script setup>
import { ref, computed, watch } from 'vue';
import { EyeClosed, Eye } from 'lucide-vue-next';

import { getRandomId } from '../../composables/getRandomId'

const value = defineModel()

const id = ref(getRandomId())

const props = defineProps({
  label: String,
  autocomplete: String,
  modelValue: String,
  type: { type: String, default: "text" },
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

const type = ref(props.type)

function passwordToggle() {
  if (type.value === 'password') {
    type.value = 'text'
  } else {
    type.value = 'password'
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="form-label" for="">{{ label }}</label>
    <input v-if="props.type !== 'password'" :class="[isTypeText ? 'w-full form-item' : '', classInput]" :type="type" :id="id" :placeholder="placeholder"
      v-model="value" />
    <div v-else class="relative">
      <input :class="[isTypeText ? 'w-full form-item' : '', classInput]" :type="type" :id="id"
        :placeholder="placeholder" v-model="value" />
      <template v-if="props.type === 'password'">
        <Eye @click="passwordToggle" v-if="type === 'password'"
          class="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#54505B]" />
        <EyeClosed @click="passwordToggle" v-else
          class="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#54505B]" />
      </template>
    </div>


  </div>
</template>
