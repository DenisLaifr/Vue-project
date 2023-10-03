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
