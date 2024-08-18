<template>
  <Dropdown
    :modelValue="open"
    transition="crs-select"
    class="crs-select"
    :class="{ open, disabled }"
    @update:modelValue="setOpen"
  >
    <div class="crs-select-value">
      <div>{{ sOptions[modelValue] }}</div>
      <Caret />
    </div>
    <template #dropdown>
      <div
        v-for="opt in unselected"
        :key="opt"
        class="crs-select-item"
        @click="select(opt)"
      >
        {{ sOptions[opt] }}
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue'
import Dropdown from './Dropdown.vue'

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const props = withDefaults(
  defineProps<{
    modelValue: string | number
    options: Record<string, string> | string[] | undefined
    disabled: boolean
  }>(),
  {
    modelValue: '',
  },
)
const { modelValue, disabled, options } = toRefs(props)

const open = ref(false)

const sOptions = computed<Record<string, string>>(() => {
  if (!options.value) return {}
  if (Array.isArray(options.value)) {
    const obj: Record<string, string> = {}
    for (const option of options.value) {
      obj[option] = option
    }
    return obj
  }
  return options.value
})

const unselected = computed(() => {
  return Object.keys(sOptions.value).filter((opt) => opt !== modelValue.value)
})

const select = (option: number | string) => {
  emit('update:modelValue', option)
  open.value = false
}

const setOpen = (isOpen: boolean) => {
  open.value = !disabled.value && isOpen
}
</script>

<style lang="postcss">
@import '../../css/global.postcss';

.crs-select-value {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .caret {
    margin-top: 4px;
    border-color: $text-dark3;
  }
}
.crs-select {
  @mixin select;
  &.open {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  &.disabled {
    cursor: default;
    background-color: #ddd;
    color: $text-med;
    .crs-select-value .caret {
      border-color: $text-med;
    }
  }
}
.dropdown-menu {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.crs-select-item {
  @mixin title-regular 14px;
  @mixin flex-center;
  justify-content: flex-start;
  height: 34px;
  padding: 0 16px;
  background-color: #eee;
}
.crs-select-enter-active,
.crs-select-leave-active {
  transition: all 250ms;
  transition-timing-function: cubic-bezier(0.53, 2, 0.36, 0.85);
}
.crs-select-enter-from,
.crs-select-leave-active {
  opacity: 0;
}
.crs-select-enter-from,
.crs-select-leave-to {
  position: absolute;
}
.crs-select-enter-from {
  transform: translateY(-10px);
}
.crs-select-leave-active {
  transform: translateY(10px);
}
</style>
