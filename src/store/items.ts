import { defineStore } from "pinia";
import { Item, Comment } from "@/types/items";
import { getItemDetail, getJobsList, getStoriesList } from "@/api/items";

type ItemsStore = {
  initialized: boolean;
  storiesIds: string[];
  jobsIds: string[];
  items: Item[];
  currentItem: Item | null;
  activeItems: Item[];
};

export const useItemsStore = defineStore("items", {
  state: () => {
    return {
      initialized: false,
      storiesIds: [],
      jobsIds: [],
      items: [],
      currentItem: null,
      activeItems: [],
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
          return getItemDetail<Item>(storyId);
        });

      // Fetch details for the first 50 jobs
      const jobDetailsPromises = this.jobsIds.slice(0, 50).map((jobId) => {
        return getItemDetail<Item>(jobId);
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

    // This code sets the active items to be displayed by filtering the items array
    // using the categories array. The active items are then set to the filtered array.
    async setCategories(categories: string[]) {
      this.activeItems = this.items.filter((item) => {
        return categories.includes(item.type);
      });
    },

    // This code sets the current item to the item with the given id
    // and then retrieves the comments for that item if they exist.
    async setCurrentItem(id: string) {
      const item = await getItemDetail<Item>(id);
      if (item.kids) {
        item.comments = [];
        for (const kid of item.kids) {
          item.comments.push(await getItemDetail<Comment>(kid.toString()));
        }
      }
      this.currentItem = item;
    },
  },
});
