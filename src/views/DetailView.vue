<template>
  <div>
    <div v-if="currentItem" class="mx-auto px-4 py-2 h-screen overflow-y-auto">
      <div class="mx-auto">
        <div class="flex items-center mb-4 border-b border-gray-900">
          <router-link
            to="/"
            class="text-gray-900 font-bold text-xl hover:text-blue-900"
            >{{ $t('detail_view.back') }}</router-link
          >
          <div class="w-full text-center">
            <h1 class="text-3xl font-bold text-gray-900">
              {{ currentItem.title }}
            </h1>
          </div>
        </div>
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
            <a
              :href="currentItem.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-500 hover:text-blue-800"
              >{{ currentItem.url }}</a
            >
          </div>
        </div>
        <div class="mt-6">
          <div v-show="iframeLoaded" class="border border-gray-200 rounded">
            <div v-if="!iframeError">
              <iframe
                class="w-full rounded"
                height="500"
                :src="currentItem.url"
                @error="iframeError = true"
                @load="iframeLoaded = true"
              ></iframe>
            </div>
            <div v-else class="text-center text-red-500 font-bold">
              {{ $t("detail_view.iframe_error") }}
            </div>
          </div>
          <div v-if="!iframeLoaded">
            <PrimeProgressSpinner />
          </div>
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
import { onBeforeMount, ref, toRefs } from "vue";
import { format } from "date-fns";
import CommentComponent from "@/components/CommentComponent.vue";

// The iframeLoaded and iframeError variables are used to track the state of the iframe. If the iframe has loaded, then it is set to true. If there is an error, then it is set to false.

const { currentItem } = toRefs(useItemsStore());
const iframeLoaded = ref(false);
const iframeError = ref(false);

// Set the current item to the item with the given ID
onBeforeMount(() => {
  useItemsStore().setCurrentItem(String(router.currentRoute.value.params.id));
});
</script>
