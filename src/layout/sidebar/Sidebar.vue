<template>
  <div class="h-full w-52 bg-gray-900 px-2">
    <div
      class="w-full py-4 text-2xl text-white font-bold text-center border-b border-white"
    >
      HackerNews
    </div>
    <div v-if="$route.path === '/list'">
      <div class="py-2 text-lg text-white font-semibold">Filters</div>
      <div
        v-for="category in categories"
        :key="category.name"
        class="flex align-items-center text-white py-1 items-center ml-2 cursor-pointer hover:bg-gray-800 transition-all px-2 rounded-md"
      >
        <PrimeCheckbox
          v-model="categoriesValue"
          name="categories"
          :value="category.value"
          :input-id="category.name"
          :disabled="!initialized"
        />
        <label
          :for="category.name"
          class="ml-2 text-white flex items-center cursor-pointer w-full"
        >
          <i :class="category.icon" class="text-white mr-1.5" />
          {{ category.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useItemsStore } from "@/store/items";
import { ref, reactive, watch, toRefs } from "vue";

// Import the reactive utility function and the useItemsStore
// hook from the store file
const { initialized } = toRefs(useItemsStore());

// Create a variable to hold the categories that we want to support
const categoriesValue = ref(["job", "story"]);

// Create a reactive object for the categories
const categories = reactive([
  {
    name: "Stories",
    value: "story",
    icon: "pi pi-globe",
  },
  {
    name: "Jobs",
    value: "job",
    icon: "pi pi-briefcase",
  },
]);

// 1. Create a watcher to watch the categoriesValue value
watch(
  () => categoriesValue.value,
  (value) => {
    // 2. When categoriesValue changes, set the value of the items store.
    useItemsStore().setCategories(value);
  }
);
</script>
