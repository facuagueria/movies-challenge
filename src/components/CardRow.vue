<script setup lang="ts">
import type { Search } from '@/types'
import { useRouter } from 'vue-router'

defineProps<{
  row: Search
}>()

const router = useRouter()

const goRowDetailsPage = (id: string) => {
  router.push({ name: 'details', params: { id: id } })
}
</script>

<template>
  <PCard
    class="w-full sm:w-1/3 lg:w-1/4 hover:cursor-pointer"
    @click="goRowDetailsPage(row.imdbID)"
  >
    <template #header>
      <div class="flex items-center justify-center overflow-hidden rounded-t-md">
        <img alt="movie_header" :src="row.Poster" class="flex-shrink-0 min-w-full min-h-full" />
      </div>
    </template>
    <template #title> {{ row.Title }} </template>
    <template #subtitle> {{ row.Year }} </template>
  </PCard>
</template>

<style scoped></style>
