<template>
  <div
    class="dropdown"
    ref="dropdownWrap"
    :class="{ dropup: top }"
    @mouseleave="mouseLeave"
    @mouseover="mouseOver"
    @mouseenter="mouseEnter"
    @click="toggleMenu"
  >
    <slot />
    <transition :name="transition">
      <div
        v-show="modelValue"
        ref="dropdown"
        class="dropdown-menu show"
        :style="styles"
        @mouseleave="startTimer"
        @mouseenter="stopTimer"
        @click.stop
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { CSSProperties, nextTick, onUnmounted, ref, toRefs, watch } from 'vue'

const clickEventType = document.ontouchstart !== null ? 'click' : 'touchstart'

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    hover: boolean
    hoverTime: number
    hoverTimeout: number
    styles: CSSProperties
    interactive: boolean // If true, stays open until clicked outside
    transition: string
    closeOnClickOutside: boolean
  }>(),
  {
    hoverTime: 100,
    hoverTimeout: 2500,
    interactive: true,
    transition: '',
    closeOnClickOutside: true,
  },
)
const { modelValue, closeOnClickOutside, hover, hoverTime, hoverTimeout, interactive } =
  toRefs(props)

const hovering = ref(false)
const top = ref(false)
const dropdown = ref()
const dropdownWrap = ref()
let hoverOpenTimer: ReturnType<typeof setTimeout> | undefined
let hoverTimer: ReturnType<typeof setTimeout> | undefined

watch(modelValue, (v) => {
  if (v) {
    top.value = false
    nextTick(() => {
      const rect = dropdown.value?.$el?.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      top.value = rect.bottom > windowHeight && rect.top >= rect.height
    })
  }
})

const mouseEnter = () => {
  stopTimer()
  if (hover.value && hoverTime.value > 0 && !modelValue.value) {
    hoverOpenTimer = setTimeout(() => {
      updateValue(true)
      // Briefly disable
      hovering.value = true
      setTimeout(() => {
        hovering.value = false
      }, hoverTimeout.value)
    }, hoverTime.value)
  }
  if (hover.value && !modelValue.value && hoverTime.value === 0) {
    hovering.value = true
    setTimeout(() => {
      hovering.value = false
    }, hoverTimeout.value)
    updateValue(true)
  }
}

const mouseLeave = () => {
  if (!hoverTimer) {
    startTimer()
  }
  if (hoverTime.value > 0 && hover.value) {
    clearTimeout(hoverOpenTimer)
  }
}

const mouseOver = () => {
  stopTimer()
}

const closeMenu = (event: MouseEvent | TouchEvent) => {
  if (!event || !dropdownWrap.value?.$el.contains(event.target)) {
    if (modelValue.value && closeOnClickOutside.value) {
      updateValue(false)
    }
  }
}

const toggleMenu = () => {
  if (hovering.value || (modelValue.value && hover.value)) {
    return
  }
  updateValue(!modelValue.value)
}

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
  if (value) {
    document.body.addEventListener(clickEventType, closeMenu)
  } else {
    document.body.removeEventListener(clickEventType, closeMenu)
  }
}

const stopTimer = () => {
  clearTimeout(hoverTimer)
  hoverTimer = undefined
}
const startTimer = () => {
  if (!interactive.value) {
    hoverTimer = setTimeout(closeMenu, hoverTimeout.value)
  }
}

onUnmounted(() => {
  document.body.removeEventListener('click', closeMenu)
})
</script>

<style lang="postcss">
.dropdown {
  position: relative;
  cursor: pointer;
}
.dropdown-menu {
  position: absolute;
  top: 34px;
  z-index: 1000;
  width: 100%;
  left: 0;
  max-height: 120px;
  overflow-y: scroll;
}
</style>
