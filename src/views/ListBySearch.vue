<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGetBySearch } from '@/composables/useGetBySearch'
import CardRow from '@/components/CardRow.vue'
import BaseInputText from '@/components/BaseInputText.vue'
import NavBar from '@/components/NavBar.vue'

const useGet = reactive(useGetBySearch())
const route = useRoute()

const props = defineProps<{
  type: string
}>()

watch(
  () => route.fullPath,
  () => {
    useGet.clear()
  }
)

const title = computed(() => {
  return props.type === 'movie' ? 'Movies' : 'Series'
})
</script>

<template>
  <NavBar />
  <Toast />
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-3xl font-bold mb-5 text-white">{{ title }}</h1>
    <form class="flex gap-3 h-10" @submit.prevent="useGet.getBySearch(props.type, 1)">
      <BaseInputText
        input-id="search"
        v-model="useGet.search"
        :placeholder="`Search ${title}`"
        with-error
        :error-message="useGet.errorMessage"
        :class="{ 'p-invalid': useGet.errorMessage }"
        aria-describedby="text-error"
      />
      <PButton type="submit" label="Search" />
    </form>
    <PProgressSpinner v-if="useGet.isLoading" class="mt-5" />
    <div v-if="useGet.result">
      <div v-show="useGet.result.Search && !useGet.isLoading" class="flex flex-col py-8 gap-4">
        <span class="text-xl font-bold self-center">
          Results for "{{ useGet.termSent }}" ({{ useGet.result?.totalResults }})
        </span>
        <div class="flex md:flex-row justify-center gap-6 flex-wrap max-w-full">
          <CardRow v-for="movie in useGet.result.Search" :key="movie.imdbID" :row="movie" />
        </div>
        <PPaginator
          @page="useGet.paginateResult(props.type, $event)"
          :rows="10"
          :totalRecords="Number(useGet.result.totalResults)"
        />
      </div>
    </div>
  </div>
</template>
