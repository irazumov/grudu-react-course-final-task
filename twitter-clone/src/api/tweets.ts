import { ApiClient } from ".";

export interface ITweet {
  id?: string;
  author_id: string;
  text: string;
}

const tweetsApi = new ApiClient<ITweet>("http://localhost:3001/tweets");

export default tweetsApi;
