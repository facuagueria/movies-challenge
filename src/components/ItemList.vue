<script setup lang="ts">
defineProps<{
  label: string
  value?: string | number
}>()
</script>

<template>
  <div class="flex flex-col">
    <span class="text-[#767E94]">{{ label }}</span>
    <span class="text-[#C3C8D4]">{{ value }}</span>
  </div>
</template>
