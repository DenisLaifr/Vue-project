<template>
  <div
    class="rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl hover:bg-white transition-all"
    :class="returnType()"
  >
    <h2 class="text-lg font-medium mb-4 flex">
      {{ item.title }}
      <div class="px-2">-</div>
      <h2 class="text-gray-400">{{ item.by }}</h2>
    </h2>
    <p class="text-gray-500">
      {{ format(new Date(item.time), "MMMM dd - HH:mm") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Item } from "@/types/items";
import { format } from "date-fns";

const props = defineProps<{ item: Item }>();

function returnType() {
  if (props.item.type === "job") {
    return "bg-red-50";
  } else if (props.item.type === "story") {
    return "bg-green-50";
  } else if (props.item.type === "comment") {
    return "bg-blue-50";
  }
}
</script>
