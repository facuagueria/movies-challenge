<script setup lang="ts">
withDefaults(
  defineProps<{
    inputId: string
    label?: string
    withError?: boolean
    errorMessage?: string
  }>(),
  {
    withError: false
  }
)
defineOptions({ inheritAttrs: false })
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" :for="inputId">{{ label }}</label>
    <PCalendar v-bind="$attrs" input-id="date" date-format="yy/mm/dd" class="h-10" />
    <small v-if="withError && errorMessage" class="p-error" id="text-error">
      {{ errorMessage || '&nbsp;' }}
    </small>
  </div>
</template>

<style scoped></style>
