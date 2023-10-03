<template>
  <div
    class="rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl hover:bg-white transition-all"
    :class="returnType(item.type)"
    @click="redirectToDetail"
  >
    <h2 class="text-lg font-medium mb-3 pb-1 flex border-b border-gray-300">
      {{ item.title }}
      <div class="px-2">-</div>
      <h2 class="text-gray-400">{{ item.by }}</h2>
    </h2>
    <p class="text-gray-500">
      {{ $t("list_card.comments") }}: {{ item.kids ? item.kids.length : 0 }}
    </p>
    <p class="text-gray-500">
      {{ format(new Date(item.time * 1000), "MMMM dd - HH:mm") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { Item } from "@/types/items";
import { format } from "date-fns";
import { returnType } from "@/utils/global";

const props = defineProps<{ item: Item }>();

function redirectToDetail() {
  router.push({ name: "detail", params: { id: props.item.id } });
}
</script>
