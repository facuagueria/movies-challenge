<script setup lang="ts">
import BaseInputText from '@/components/BaseInputText.vue'
import { useAuth } from '@/composables/useAuth'

const { login, email, password } = useAuth()
</script>

<template>
  <Toast />
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Sign in to your account
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="login">
        <div class="mt-2">
          <BaseInputText
            type="email"
            v-model="email"
            label="Email"
            input-id="email"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
        <div class="mt-2">
          <BaseInputText
            v-model="password"
            input-id="password"
            label="Password"
            type="password"
            required
          />
        </div>

        <PButton label="Sign In" type="submit" size="small" class="h-10 w-full flex" />
      </form>
    </div>
  </div>
</template>

<style scoped></style>
