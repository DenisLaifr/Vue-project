<template>
  <div class="w-screen flex flex-col h-screen overflow-hidden">
    <!-- TOPBAR SPACE -->
    <div class="w-ull bg-white shadow text-center text-gray-500 py-1">
      HackerNews - Denis Laifr
    </div>
    <!-- MAIN CONTENT -->
    <main class="flex-1">
      <RouterView v-slot="{ route, Component }">
        <transition
          name="route"
          mode="out-in"
          :duration="routeTransitionDuration"
        >
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>
<script setup lang="ts">
// this component is for creating a layout for the view
import { RouterView } from "vue-router";
import { routeTransitionDuration } from "@/App.vue";
</script>
