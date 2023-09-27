<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
const { userAuthenticated, logout } = useAuth()
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const menu = ref()
const items = [
  {
    label: 'Movies',
    route: { name: 'movies' }
  },
  {
    label: 'Series',
    route: { name: 'series' }
  },
  {
    label: 'Own List',
    route: { name: 'own-movies-series' }
  }
]

const itemsMenu = ref([
  {
    label: userAuthenticated.email,
    icon: 'pi pi-fw pi-user'
  },
  { separator: true },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => logout()
  }
])

const toggle = (event: Event) => {
  menu.value.toggle(event)
}
</script>

<template>
  <div class="flex justify-center items-center h-20 mx-auto mb-10 w-full px-10">
    <div>
      <ul class="flex h-full gap-10">
        <li v-for="item in items" :key="item.label">
          <RouterLink :to="item.route">
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="ml-auto">
      <PAvatar class="cursor-pointer" icon="pi pi-user" shape="circle" @click="toggle" />
      <PMenu ref="menu" id="overlay_menu" :model="itemsMenu" :popup="true" />
    </div>
  </div>
</template>

<style scoped></style>
