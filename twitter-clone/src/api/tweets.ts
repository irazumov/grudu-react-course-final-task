import { ApiClient } from ".";

export interface ITweet {
  id?: string;
  author_id: string;
  text: string;
}

const tweetsApi = new ApiClient<ITweet>("/tweets");

export default tweetsApi;
