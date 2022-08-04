import React from "react";
import tweetsApi, { ITweet } from "../../api/tweets";
import usersApi, { IUser } from "../../api/users";
import { useAuth } from "../../contexts/auth";
import { getAbbr } from "../../utils/user";
import { ITweetsItemProps } from "./TweetsItem";

interface TweetsContextType {
  tweets: ITweetsItemProps[];
  error: string | null;
  loading: boolean;
  getTweets: () => void;
  createTweet: (tweet: ITweet) => void;
}

const TweetsContext = React.createContext<TweetsContextType>(null!);

export default function TweetsProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const [tweets, setTweets] = React.useState<ITweetsItemProps[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const getTweets = async () => {
    setLoading(true);
    setError(null);
    try {
      const tweets = await tweetsApi.find();
      if(tweets.status === 200) {
        const users = await usersApi.find();
        const usersDict: { [id: string]: IUser } = {};
        for (let i = 0; i < users.data.length; i++) {
          usersDict[users.data[i].id] = users.data[i];
        }
        const tweetsList: ITweetsItemProps[] = tweets
          .data
          .map((tweet) => {
            const name = usersDict[tweet.author_id]!.name
            return {
              tweet: tweet.text,
              user: {
                name,
                abbr: getAbbr(name),
              },
            };
          });

        setTweets(tweetsList);
        return;
      }
      throw new Error("Unknown error");
    } catch (error) {
      const err = error as unknown as Error;
      setError(err.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const createTweet = async (tweet: ITweet) => {
    setLoading(true);
    setError(null);
    try {
      const author_id = auth.user!.id;

      const newTweet = await tweetsApi.insertOne({
        ...tweet,
        author_id,
      });
      if (newTweet.status === 201) {
        setTweets([...tweets, {
          tweet: newTweet.data.text,
          user: {
            name: auth.user!.name,
            abbr: getAbbr(auth.user!.name)
          },
        }]);
        return;
      }
      throw new Error("Unknown error");
    } catch (error) {
      const err = error as unknown as Error;
      setError(err.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const value: TweetsContextType = {
    tweets,
    loading,
    error,
    getTweets,
    createTweet,
  };

  return <TweetsContext.Provider value={value}>{children}</TweetsContext.Provider>;
}

export function useTweets() {
  return React.useContext(TweetsContext);
}
