<template>
    <Listbox v-model="internalValue" :multiple="multiple" class="w-full">
      <div class="relative">
        <ListboxButton
          class="relative w-full cursor-pointer rounded-lg bg-[#37343D] py-3 pl-4 pr-10 text-left text-white shadow-md"
        >
          <span class="block truncate">
            {{ displayValue }}
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg class="h-[5px] w-[10px] text-gray-400" height="4" viewBox="0 0 10 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 4L0.669872 0.250001L9.33013 0.25L5 4Z" fill="white" />
            </svg>
          </span>
        </ListboxButton>
        <TransitionRoot
          enter="transition ease-out duration-100"
          enter-from="transform opacity-0 scale-95"
          enter-to="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leave-from="transform opacity-100 scale-100"
          leave-to="transform opacity-0 scale-95"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#37343D] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              class="relative cursor-pointer select-none py-2 pl-10 pr-4 text-white hover:bg-[#3b3b3b]"
              v-slot="{ active, selected }"
            >
              <span
                class="block truncate"
                :class="selected ? 'font-medium' : 'font-normal'"
              >
                {{ option.label }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-white"
              >
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0l-3.536-3.535a1 1 0 111.414-1.415L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </ListboxOption>
          </ListboxOptions>
        </TransitionRoot>
      </div>
    </Listbox>
  </template>
  
  <script setup>
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    TransitionRoot,
  } from '@headlessui/vue'
  import { computed } from 'vue'
  
  const props = defineProps({
    modelValue: {
      type: [String, Array],
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Выберите значение',
    },
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })
  
  const isSelected = (value) => {
    if (Array.isArray(internalValue.value)) {
      return internalValue.value.includes(value)
    } else {
      return internalValue.value === value
    }
  }
  
  const displayValue = computed(() => {
    if (props.multiple) {
      if (Array.isArray(internalValue.value) && internalValue.value.length > 0) {
        // преобразуем массив выбранных значений в их метки (label)
        const selectedOptions = props.options.filter((opt) =>
          internalValue.value.includes(opt.value)
        )
        return selectedOptions.map((opt) => opt.label).join(', ')
      } else {
        return props.placeholder
      }
    } else {
      const selectedOption = props.options.find(
        (opt) => opt.value === internalValue.value
      )
      return selectedOption ? selectedOption.label : props.placeholder
    }
  })
  </script>
  