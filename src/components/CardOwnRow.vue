<script setup lang="ts">
import type { OwnList } from '@/types/ownMovieSeries'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  row: OwnList
}>()

const emits = defineEmits<{
  (e: '@delete', payload: string): void
}>()

const release_date = computed(() => {
  return new Date(props.row.release_date).toISOString().split('T')[0]
})

const goToPageEdit = () => {
  router.push({ name: 'edit', params: { id: props.row.id } })
}
</script>

<template>
  <PCard class="w-full md:w-1/4">
    <template #title> {{ row.title }} </template>
    <template #subtitle> {{ release_date }} </template>
    <template #content>
      <p class="overflow-y-scroll">
        <span class="font-bold">Description:</span> {{ row.description }}
      </p>
      <span><span class="font-bold">Type:</span> {{ row.type === 'm' ? 'Movie' : 'Series' }}</span>
      <p><span class="font-bold">Rating:</span> {{ row.rating }}</p>
    </template>
    <template #footer>
      <div class="flex gap-5">
        <PButton
          @click="emits('@delete', row.id)"
          outlined
          severity="danger"
          type="button"
          label="Delete"
          size="small"
        />
        <PButton @click="goToPageEdit" type="button" label="Edit" size="small" />
      </div>
    </template>
  </PCard>
</template>

<style scoped></style>
