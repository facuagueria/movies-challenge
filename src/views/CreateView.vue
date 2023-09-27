<script setup lang="ts">
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router'
import BaseInputText from '@/components/BaseInputText.vue'
import BaseTextarea from '@/components/BaseTextarea.vue'
import BaseCalendar from '@/components/BaseCalendar.vue'
import BaseInputNumber from '@/components/BaseInputNumber.vue'
import { useOwnList } from '@/composables/useOwnList'
import { v4 as uuidv4 } from 'uuid'
import type { OwnList } from '@/types/ownMovieSeries'

const router = useRouter()

const title = ref<string>('')

const description = ref<string>('')
const type = ref<string>('')
const release_date = ref<string>('')
const rating = ref<number>(1)
const { create } = useOwnList()

const errorMessageTitle = ref<string>('')
const errorMessageDescription = ref<string>('')
const errorMessageType = ref<string>('')
const errorMessageRating = ref<string>('')
const errorMessageDate = ref<string>('')
const cancel = () => {
  router.push({ name: 'own-movies-series' })
}

const handleSubmit = () => {
  if (title.value === '') {
    errorMessageTitle.value = 'Title is required'
    return
  } else {
    errorMessageTitle.value = ''
  }

  if (description.value === '') {
    errorMessageDescription.value = 'Description is required'
    return
  } else {
    errorMessageDescription.value = ''
  }

  if (type.value === '') {
    errorMessageType.value = 'Type is required'
    return
  } else {
    errorMessageType.value = ''
  }

  if (release_date.value === '') {
    errorMessageType.value = 'Release Date is required'
    return
  } else {
    errorMessageType.value = ''
  }

  if (!rating.value) {
    errorMessageType.value = 'Rating is required'
    return
  } else {
    errorMessageType.value = ''
  }

  const formFields: OwnList = {
    id: uuidv4(),
    title: title.value,
    description: description.value,
    type: type.value,
    release_date: release_date.value,
    rating: rating.value
  }

  create(formFields)
}
</script>

<template>
  <Toast />
  <NavBar />
  <div class="flex w-full items-center justify-center mb-5">
    <h1 class="text-3xl font-bold mb-5 text-white">Add Movie/Series</h1>
  </div>
  <div class="flex flex-col w-full md:w-1/3">
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
      <BaseInputText
        v-model="title"
        input-id="title"
        label="Title"
        placeholder="Title"
        with-error
        :error-message="errorMessageTitle"
        :class="{ 'p-invalid': errorMessageTitle }"
        aria-describedby="text-error"
      />
      <BaseTextarea
        v-model="description"
        input-id="description"
        label="Description"
        placeholder="Description"
        with-error
        :error-message="errorMessageDescription"
        :class="{ 'p-invalid': errorMessageDescription }"
        aria-describedby="text-error"
      />
      <div class="flex flex-col gap-2">
        <label>Type</label>
        <div class="flex gap-4">
          <div>
            <PRadioButton
              inputId="type_movie"
              v-model="type"
              value="m"
              :class="{ 'p-invalid': errorMessageType }"
              aria-describedby="text-error"
            />
            <label for="type_movie" class="ml-2">Movie</label>
          </div>
          <div>
            <PRadioButton
              inputId="type_series"
              v-model="type"
              value="s"
              :class="{ 'p-invalid': errorMessageType }"
              aria-describedby="text-error"
            />
            <label for="type_series" class="ml-2">Series</label>
          </div>
        </div>
        <small v-if="errorMessageType" class="p-error" id="text-error">
          {{ errorMessageType || '&nbsp;' }}
        </small>
      </div>
      <BaseCalendar
        :error-message="errorMessageDate"
        :class="{ 'p-invalid': errorMessageDate }"
        aria-describedby="text-error"
        v-model="release_date"
        input-id="date"
        label="Release Date"
        with-error
      />
      <BaseInputNumber
        v-model="rating"
        :min="0"
        :max="10"
        :max-fraction-digits="2"
        input-id="rating"
        label="Rating"
        with-error
        :error-message="errorMessageRating"
        :class="{ 'p-invalid': errorMessageRating }"
        aria-describedby="text-error"
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
        <PButton class="w-1/2" type="submit" label="Create" size="small" />
      </div>
    </form>
  </div>
</template>
