<template>
  <div class="w-full h-screen overflow-y-auto">
    <div v-if="initialized" class="space-y-4 px-2 py-3">
      <ListCard v-for="item in activeItems" :key="item.id" :item="item" />
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

/**
 * This code initializes the items store. This is necessary because
 * the items store is used to keep track of all items in the game.
 * It is necessary to initialize the items store before we can use it.
 */
const { activeItems, initialized } = toRefs(useItemsStore());
useItemsStore().initialize();
</script>
