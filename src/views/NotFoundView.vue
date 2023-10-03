<template>
  <div
    class="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8"
  >
    <div class="max-w-max mx-auto">
      <main class="sm:flex">
        <p class="text-4xl font-extrabold text-primary-600 sm:text-5xl">404</p>
        <div class="sm:ml-6">
          <div class="sm:border-l sm:border-primary-200 sm:pl-6">
            <h1
              class="text-4xl font-extrabold text-primary-900 tracking-tight sm:text-5xl"
            >
              {{ $t("not_found_view.page_not_found") }}
            </h1>
            <p class="mt-1 text-base text-primary-500">
              {{ $t("not_found_view.check_url") }}
            </p>
          </div>
          <div
            class="mt-6 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6"
          >
            <button
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              @click="goBack"
            >
              {{ $t("not_found_view.go_to_home_page") }}
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
  router.push({ name: "list" });
};
</script>
