import { Item } from "@/types/items";
import request from "@/utils/request";
import { AxiosResponse } from "axios";

// This function gets the list of IDs of the stories from the Hacker News API.
// It returns a list of IDs of the stories.
// The IDs are used to retrieve the details of each story.
export const getStoriesList = async (): Promise<AxiosResponse<string[]>> => {
  const response = await request.get<string[]>("/newstories.json");

  return response;
};

// This function gets the list of IDs of the jobs from the Hacker News API.
// It returns a list of IDs of the jobs.
// The IDs are used to retrieve the details of each job.
export const getJobsList = async (): Promise<AxiosResponse<string[]>> => {
  const response = await request.get<string[]>("/jobstories.json");

  return response;
};

// This function retrieves the details of a story or a job from the Hacker News API.
// It returns the details of the story or job.
// The function takes in the ID of the story or job as an argument.
export const getItemDetail = async (id: string): Promise<Item> => {
  const response = await request.get<Item>(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );

  return response.data;
};
