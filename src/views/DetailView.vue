<template>
  <div>
    <div v-if="currentItem" class="mx-auto px-4 py-2 h-screen overflow-y-auto">
      <div class="mx-auto">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ currentItem.title }}
        </h1>
        <div class="mt-4 flex items-center">
          <div class="flex-shrink-0">
            <i class="pi pi-user text-2xl text-gray-900"></i>
          </div>
          <div class="ml-3 text-sm text-gray-500">
            <p>
              <span class="font-medium">{{ currentItem.by }}</span>
              <span class="mx-1">&middot;</span>
              <span>{{
                format(new Date(currentItem.time * 1000), "MMMM dd - HH:mm")
              }}</span>
            </p>
          </div>
        </div>
        <div class="mt-6">
          <iframe
            class="w-full rounded"
            height="500"
            :src="currentItem.url"
          ></iframe>
        </div>
        <div class="mt-6">
          <CommentComponent
            v-for="kid in currentItem.kids"
            :key="kid"
            :comment-id="kid"
          />
        </div>
      </div>
    </div>
    <div v-else class="w-full h-full text-center flex items-center">
      <PrimeProgressSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useItemsStore } from "@/store/items";
import { onBeforeMount, toRefs } from "vue";
import { format } from "date-fns";
import CommentComponent from "@/components/CommentComponent.vue";

const { currentItem } = toRefs(useItemsStore());

onBeforeMount(() => {
  useItemsStore().setCurrentItem(String(router.currentRoute.value.params.id));
});
</script>
