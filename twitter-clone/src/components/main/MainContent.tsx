import { useEffect, useState } from 'react';
import './MainContent.css';
import TweetForm from '../tweets/TweetForm';
import TweetsList from '../tweets/TweetsList';
import TweetsItem, { ITweetsItemProps } from '../tweets/TweetsItem';
import tweetsApi from '../../api/tweets';

export default function MainContent() {

  const [tweets, setTweets] = useState<ITweetsItemProps[]>([
    {
      tweet: 'Hello, world!',
      user: {
        name: 'John Doe',
        avatar: 'JD',
      },
    },
    {
      tweet: 'Hello, world!',
      user: {
        name: 'John Doe',
        avatar: 'JD',
      },
    },
  ]);

  const fetchTweets = () => {
    tweetsApi.find().then(tweets => {
      setTweets(tweets.map(({ id, author_id, text }) => ({
        tweet: text,
        user: {
          name: author_id,
          avatar: 'JD',
        },
      })));
    });
  };


  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <div className="main-content">
      <TweetForm onAdded={fetchTweets} />
      <TweetsList>
        {tweets.map((tweet, index) => <TweetsItem key={index} tweet={tweet.tweet} user={tweet.user} />)}
      </TweetsList>
    </div>
  );
}