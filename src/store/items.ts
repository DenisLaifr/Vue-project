import { defineStore } from "pinia";
import { Item } from "@/types/items";
import { getItemDetail, getJobsList, getStoriesList } from "@/api/items";

type ItemsStore = {
  initialized: boolean;
  storiesIds: string[];
  jobsIds: string[];
  items: Item[];
  activeItems: Item[];
  currentItem: Item | null;
};

export const useItemsStore = defineStore("items", {
  state: () => {
    return {
      initialized: false,
      storiesIds: [],
      jobsIds: [],
      items: [],
      activeItems: [],
      currentItem: null,
    } as ItemsStore;
  },

  actions: {
    async initialize() {
      await this.fetchItems();
      this.initialized = true;
    },

    async fetchItems() {
      const responseStories = await getStoriesList();
      if (responseStories.status === 200) {
        this.storiesIds = responseStories.data;
      }
      const responseJobs = await getJobsList();
      if (responseJobs.status === 200) {
        this.jobsIds = responseJobs.data;
      }

      // Fetch details for the first 50 stories
      const storyDetailsPromises = this.storiesIds
        .slice(0, 50)
        .map((storyId) => {
          return getItemDetail(storyId);
        });

      // Fetch details for the first 50 jobs
      const jobDetailsPromises = this.jobsIds.slice(0, 50).map((jobId) => {
        return getItemDetail(jobId);
      });

      // Wait for all the details to be fetched
      const storyDetails = await Promise.all(storyDetailsPromises);
      const jobDetails = await Promise.all(jobDetailsPromises);

      // Combine the story and job details into a single array
      const itemDetails = [...storyDetails, ...jobDetails];

      // Push the details into the items array
      this.items.push(...itemDetails);

      // reorder the items array based on the UnixTime
      this.items.sort((a, b) => b.time - a.time);
      this.activeItems = this.items;
    },

    async setCategories(categories: string[]) {
      this.activeItems = this.items.filter((item) => {
        return categories.includes(item.type);
      });
    },
  },
});
