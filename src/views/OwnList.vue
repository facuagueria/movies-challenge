<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router'
import { useOwnList } from '@/composables/useOwnList'
import type { OwnList } from '@/types/ownMovieSeries'
import CardOwnRow from '@/components/CardOwnRow.vue'
import { ref } from 'vue'

const router = useRouter()
const { getOwnList, deleteOne } = useOwnList()

const ownList = ref<OwnList[]>(getOwnList())

const goToCreatePage = () => {
  router.push({ name: 'create' })
}

const handleDelete = (id: string) => {
  deleteOne(id)
  ownList.value = getOwnList()
}
</script>

<template>
  <Toast />
  <NavBar />
  <div class="flex flex-col justify-center items-center">
    <div class="flex items-center justify-center gap-4">
      <h1 class="text-3xl font-bold text-white">Own Movies/Series</h1>
      <PButton type="button" label="Add" size="small" @click="goToCreatePage()" />
    </div>

    <div class="flex md:flex-row justify-center gap-6 flex-wrap w-full mt-8">
      <CardOwnRow @@delete="handleDelete" v-for="row in ownList" :key="row?.id" :row="row" />
    </div>
  </div>
</template>
