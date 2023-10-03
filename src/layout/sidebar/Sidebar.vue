<template>
  <div class="h-full w-52 bg-gray-900 px-2">
    <div
      class="w-full py-4 text-2xl text-white font-bold text-center border-b border-white"
    >
      HackerNews
    </div>
    <div class="py-2 text-lg text-white font-semibold">Filters</div>
    <div>
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

const { initialized } = toRefs(useItemsStore());
const categoriesValue = ref(["job", "story"]);
const categories = reactive([
  {
    name: "Jobs",
    value: "job",
    icon: "pi pi-briefcase",
  },
  {
    name: "Stories",
    value: "story",
    icon: "pi pi-globe",
  },
]);

watch(
  () => categoriesValue.value,
  (value) => {
    useItemsStore().setCategories(value);
  }
);
</script>
