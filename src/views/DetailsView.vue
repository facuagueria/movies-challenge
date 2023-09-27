<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGetOne } from '@/composables/useGetOne'
import type { DetailsData } from '@/types'
import ItemList from '@/components/ItemList.vue'
import NavBar from '@/components/NavBar.vue'
import { useNotification } from '@/composables/useNotification'

const props = defineProps<{
  id: string
}>()

const { getOneById } = useGetOne()
const { showError } = useNotification()
const isLoading = ref<boolean>(false)
const details = ref<DetailsData | null>(null)

onMounted(() => {
  isLoading.value = true
  getOneById(props.id)
    .then((res: DetailsData) => {
      details.value = res
    })
    .catch((error) => {
      showError(error)
    })
    .finally(() => {
      isLoading.value = false
    })
})
</script>

<template>
  <Toast />
  <NavBar />
  <PProgressSpinner v-if="isLoading" class="pt-3" />
  <div v-if="!isLoading" class="flex flex-col md:flex-row justify-center gap-5 py-5">
    <div class="flex flex-col w-full md:w-1/2 gap-3">
      <h1 class="text-3xl font-bold text-white">{{ details?.Title }}</h1>
      <img :src="details?.Poster" alt="poster_image" class="w-[480px] h-[720px] rounded-lg" />
    </div>
    <div class="flex flex-col w-full md:w-1/2 gap-6">
      <p class="mt-12">{{ details?.Plot }}</p>
      <ItemList label="Rating (IMDB)" :value="details?.imdbRating" />
      <ItemList label="Type" :value="details?.Type === 'series' ? 'Series' : 'Movie'" />
      <ItemList label="Release Date:" :value="details?.Released" />
      <ItemList label="Run time" :value="details?.Runtime" />
      <ItemList label="Genres" :value="details?.Genre" />
      <ItemList label="Awards" :value="details?.Awards" />
      <ItemList label="Main Actors" :value="details?.Actors" />
      <ItemList v-if="details?.totalSeasons" label="Total Seasons" :value="details?.totalSeasons" />
    </div>
  </div>
</template>
