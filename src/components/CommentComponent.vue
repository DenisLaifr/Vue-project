<template>
  <div v-if="comment" class="py-2">
    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <i class="pi pi-user text-2xl text-gray-900"></i>
        </div>
        <div class="ml-3">
          <div class="text-sm font-medium text-gray-900">
            {{ comment.by }}
          </div>
          <div class="mt-1 text-sm text-gray-500">
            {{ format(new Date(comment.time * 1000), "MMMM dd - HH:mm") }}
          </div>
        </div>
      </div>
      <div class="mt-2 text-sm text-gray-700" v-html="comment.text" />
      <div v-if="comment.kids">
        <button
          v-if="!showKids"
          class="mt-2 text-sm text-gray-500 hover:text-gray-700 space-x-1"
          @click="showKids = true"
        >
          {{ comment.kids.length }} {{ $t("comment_component.more_comments") }}
        </button>
        <button
          v-if="showKids"
          class="mt-2 text-sm text-gray-500 hover:text-gray-700"
          @click="showKids = false"
        >
          {{ $t("comment_component.hide_comments") }}
        </button>
        <div v-if="showKids">
          <CommentComponent
            v-for="kid in comment.kids"
            :key="kid"
            :comment-id="kid"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { Comment } from "@/types/items";
import CommentComponent from "@/components/CommentComponent.vue";
import { format } from "date-fns";
import { getItemDetail } from "@/api/items";

const props = defineProps<{ commentId: string }>();
const showKids = ref(false);
const comment = ref<Comment>();

onBeforeMount(async () => {
  comment.value = await getItemDetail<Comment>(props.commentId);
});
</script>
