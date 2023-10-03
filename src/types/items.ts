// This code parses the JSON returned by the Hacker News API, and returns a list of items from the API. The code parses the JSON as a list of items, and then iterates over each item in the list, and parses the JSON as a dictionary. The code returns a list of items from the API.

export type Item = {
  id: number;
  deleted?: boolean;
  type: "job" | "story" | "comment" | "poll" | "pollopt";
  by: string;
  time: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: string[];
  comments?: Comment[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
};

export type Comment = {
  by: string;
  id: string;
  kids: string[];
  parent: string;
  text: string;
  time: number;
  type: "comment";
};
