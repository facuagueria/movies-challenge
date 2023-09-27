<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router'
import BaseInputText from '@/components/BaseInputText.vue'
import BaseTextarea from '@/components/BaseTextarea.vue'
import BaseCalendar from '@/components/BaseCalendar.vue'
import BaseInputNumber from '@/components/BaseInputNumber.vue'
import { useOwnList } from '@/composables/useOwnList'
import type { OwnList } from '@/types/ownMovieSeries'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const { updateOne, getOne } = useOwnList()
const title = ref<string>('')
const description = ref<string>('')
const type = ref<string>('')
const release_date = ref<string | Date>('')
const rating = ref<number>(1)

onMounted(() => {
  const row = getOne(props.id)

  if (row) {
    title.value = row.title
    description.value = row.description
    type.value = row.type
    const date = new Date(row.release_date)
    // release_date.value = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    const getYear = date.toLocaleString('default', { year: 'numeric' })
    const getMonth = date.toLocaleString('default', { month: '2-digit' })
    const getDay = date.toLocaleString('default', { day: '2-digit' })
    release_date.value = `${getYear}/${getMonth}/${getDay}`
    rating.value = row.rating
  }
})

const cancel = () => {
  router.push({ name: 'own-movies-series' })
}

const handleSubmit = () => {
  const formFields: OwnList = {
    id: props.id,
    title: title.value,
    description: description.value,
    type: type.value,
    release_date: release_date.value,
    rating: rating.value
  }

  updateOne(formFields)
}
</script>

<template>
  <Toast />
  <NavBar />
  <div class="flex w-full items-center justify-center mb-5">
    <h1 class="text-3xl font-bold mb-5 text-white">Edit Movie/Series</h1>
  </div>
  <div class="flex flex-col w-full md:w-1/3">
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
      <BaseInputText
        v-model="title"
        input-id="title"
        label="Title"
        placeholder="Title"
        with-error
      />
      <BaseTextarea
        v-model="description"
        input-id="description"
        label="Description"
        placeholder="Description"
        with-error
      />
      <div class="flex flex-col gap-2">
        <label>Type</label>
        <div class="flex gap-4">
          <div>
            <PRadioButton inputId="type_movie" v-model="type" value="m" />
            <label for="type_movie" class="ml-2">Movie</label>
          </div>
          <div>
            <PRadioButton inputId="type_series" v-model="type" value="s" />
            <label for="type_series" class="ml-2">Series</label>
          </div>
        </div>
      </div>
      <BaseCalendar v-model="release_date" input-id="date" label="Release Date" with-error />
      <BaseInputNumber
        v-model="rating"
        :min="0"
        :max="10"
        :max-fraction-digits="2"
        input-id="rating"
        label="Rating"
        with-error
      />

      <div class="flex gap-3 mt-3 w-full">
        <PButton
          @click="cancel"
          class="w-1/2"
          severity="danger"
          type="button"
          label="Cancel"
          size="small"
        />
        <PButton class="w-1/2" type="submit" label="Save Changes" size="small" />
      </div>
    </form>
  </div>
</template>
