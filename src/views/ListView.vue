<template>
  <div class="w-full h-screen overflow-y-auto">
    <div v-if="initialized" class="space-y-4 px-2 py-3">
      <ListCard v-for="item in items" :key="item.id" :item="item" />
    </div>
    <div v-else class="w-full h-full text-center flex items-center">
      <PrimeProgressSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useItemsStore } from "@/store/items";
import ListCard from "@/components/ListCard.vue";
import { toRefs } from "vue";

const { items, initialized } = toRefs(useItemsStore());
useItemsStore().initialize();
</script>
